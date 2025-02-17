import {
  DetailedHTMLProps,
  FC,
  HTMLAttributes,
  useCallback,
  useRef,
} from "react";
import { createRoot, Root } from "react-dom/client";
import { Provider } from "react-redux";

import { store } from "../app/store";

import { ThemeProvider } from "@emotion/react";
import theme from "../styles/theme";

interface AfterClosed<T> {
  (
    options?: {
      onSuccess?: (result: T) => void;
      onError?: (result: T) => void;
    },
    callback?: (error: null, result: T) => void
  ): void;
}

interface IPopup<T = unknown>
  extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
  close: (result?: T) => void;
}

export const useModalContext = () => {
  const modalRootRef = useRef<Root | null>(null);
  const modalContainerRef = useRef<HTMLDivElement | null>(null);

  const open = useCallback(
    <T,>(
      renderDialog: FC<IPopup<T>>
    ): Promise<T> & { afterClosed: AfterClosed<T> } => {
      const modalPromise = new Promise<T>((resolve) => {
        if (modalContainerRef.current) {
          modalRootRef.current?.unmount();
          document.body.removeChild(modalContainerRef.current);
        }

        const modalContainer = document.createElement("div");
        modalContainerRef.current = modalContainer;
        document.body.appendChild(modalContainer);

        const close = (result?: T) => {
          if (modalRootRef.current) {
            modalRootRef.current.unmount();
            modalRootRef.current = null;
          }
          if (modalContainerRef.current) {
            document.body.removeChild(modalContainerRef.current);
            modalContainerRef.current = null;
          }
          resolve(result as T);
        };

        const root = createRoot(modalContainer);
        modalRootRef.current = root;

        const dialogContent = renderDialog({ close });

        if (dialogContent instanceof Promise) {
          dialogContent.then((resolvedContent) => {
            root.render(
              <Provider store={store}>
                <ThemeProvider theme={theme}>{resolvedContent}</ThemeProvider>
              </Provider>
            );
          });
        } else {
          root.render(
            <Provider store={store}>
              <ThemeProvider theme={theme}>{dialogContent}</ThemeProvider>
            </Provider>
          );
        }
      });

      const afterClosed: AfterClosed<T> = (options = {}, callback) => {
        modalPromise.then((result) => {
          if (
            typeof result === "object" &&
            result !== null &&
            "meta" in result &&
            (result as any).meta?.requestStatus === "fulfilled"
          ) {
            options.onSuccess?.(result);
          }

          if (
            typeof result === "object" &&
            result !== null &&
            "meta" in result &&
            (result as any).meta?.requestStatus === "rejected"
          ) {
            options.onError?.(result);
          }

          callback?.(null, result);
        });
      };

      return Object.assign(modalPromise, { afterClosed });
    },
    []
  );

  return { open };
};
