import { useUpdateEffect } from 'ahooks';
import classNames from 'classnames';
import React, {
  ForwardRefRenderFunction,
  forwardRef,
  memo,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
} from 'react';

import ReactDOMStr from './editor-utils/react-dom.production.min';
import ReactStr from './editor-utils/react.production.min';
import WangEditorStr from './editor-utils/wang-editor-5.1.23';
import WangEditorReactStr from './editor-utils/wang-editor-react-1.0.6';
import { IDomEditor, IWangEditorFrameProps } from './types';

import WangEditorCssStr from './editor-utils/wang-editor-css';
import WangEditorViewCssStr from './editor-utils/wang-editor-view-css';
//@ts-ignore
import styles from './index.scss';

const editorId = 'wangEditorWrap';

const WangEditorFrame: ForwardRefRenderFunction<unknown, IWangEditorFrameProps> = (
  {
    value = '',
    width = '100%',
    height = '500px',
    bordered = true,
    readOnly = false,
    className = '',
    toolbarConfig = {},
    editorConfig = {
      placeholder: '请输入内容...',
      MENU_CONF: {
        uploadImage: {
          async customUpload(file: any, insertFn: Function) {
            // file 即选中的文件
            // 自己实现上传，并得到图片 url alt href
            // 最后插入图片
            insertFn?.(
              'https://img2.baidu.com/it/u=2138890223,974294493&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500',
              '123',
              '#',
            );
          },
        },
      },
    },
    onChange = (e) => null,
    onCreated = (e) => null,
  },
  ref,
) => {
  const frameRef = useRef<HTMLIFrameElement | null>(null);

  const editorVal = useRef(value);

  const wrapRef = useRef<HTMLDivElement | null>(null);

  const editor = useRef<IDomEditor | null>(null);

  const isMount = useRef(false);

  // 工具栏配置
  const toolbarConfigRef = useRef({
    excludeKeys: ['fullScreen'], // 这里排除全屏功能
    ...toolbarConfig,
  });

  // 编辑器配置
  const editorConfigRef = useRef(editorConfig);

  //渲染富文本
  function renderWangEditor() {
    return new Promise<{ window: Window; document: Document; wrap: HTMLDivElement } | void>(
      (resolve) => {
        const document = frameRef?.current?.contentDocument;
        const window = frameRef?.current?.contentWindow;

        if (!document || !window) {
          return;
        }

        const wrap = document.getElementById(editorId) as HTMLDivElement;

        const {
          // @ts-ignore
          WangEditorForReact: { Editor, Toolbar },
          // @ts-ignore
          ReactDOM,
        } = window;

        ReactDOM.render(
          <>
            <Toolbar
              defaultConfig={toolbarConfigRef.current}
              editor={editor.current}
              mode="default"
              style={{
                width: width || '100%',
                borderBottom: '1px solid rgba(0,0,0,0.2)',
              }}
            />

            <Editor
              defaultConfig={editorConfigRef.current}
              mode="default"
              onChange={(editor) => {
                onChange(editor.getHtml());
              }}
              onCreated={(_editor) => {
                editor.current = _editor;

                render().then(() => {
                  onCreated(_editor);
                });
              }}
              ref={ref}
              value={editorVal.current}
            />
          </>,
          wrap,
          () => {
            isMount.current = true;

            resolve({
              document,
              window,
              wrap,
            });
          },
        );
      },
    );
  }

  //渲染HTML
  function renderHTML() {
    const document = frameRef?.current?.contentDocument;

    if (!document) return;

    const wrap = document.getElementById(editorId) as HTMLIFrameElement;
    wrap.innerHTML = value;

    if (wrapRef.current) {
      wrapRef.current.style.height = `${document.documentElement.offsetHeight}px`;
    }
  }

  //判断渲染是否只读
  function render() {
    return new Promise<void>((resolve) => {
      // 只读模式
      if (readOnly) {
        renderHTML();

        resolve();

        return;
      }

      return renderWangEditor();
    });
  }

  useImperativeHandle(ref, () => ({
    // getEditor() {
    //   return editor.current;
    // },
    // getWangEditor() {
    //   return frameRef?.current?.contentWindow?.wangEditor;
    // },
  }));

  useLayoutEffect(() => {
    //iframe 加载完毕 开始渲染react wang-editor
    const onLoad = () => render();

    frameRef?.current?.addEventListener('load', onLoad);

    const reactUrl = URL.createObjectURL(new Blob([ReactStr], { type: 'text/javascript' }));
    const reactDOMUrl = URL.createObjectURL(new Blob([ReactDOMStr], { type: 'text/javascript' }));
    const wangEditorUrl = URL.createObjectURL(
      new Blob([WangEditorStr], { type: 'text/javascript' }),
    );
    const wangEditorReactUrl = URL.createObjectURL(
      new Blob([WangEditorReactStr], { type: 'text/javascript' }),
    );

    const iframeUrl = URL.createObjectURL(
      new Blob(
        [
          `<!DOCTYPE html>
            <html lang="en">
               <head>
                <meta charset="UTF-8" />
                <title></title>
                <style>
                  html, body {
                    margin: 0;
                    padding: 0;
                    width: ${width};
                    height: 100%;
                  }
                  
                  html > body > #${editorId} {
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                    width: ${width};
                  }
                  
                  html > body > #${editorId} > [data-w-e-toolbar=true] {
                  }
      
                  html > body > #${editorId} > [data-w-e-textarea=true] {
                    flex-grow: 1;
                    min-height: 0;
                    height: 100%;
                    overflow-y: auto;
                  }
      
                  ::-webkit-scrollbar-thumb {
                    background-color: rgba(0, 0, 0, 0.1);
                    border-radius: 4px;
                  }
                  
                  *::-webkit-scrollbar-track {
                    background-color: rgba(0, 0, 0, 0.1);
                  }
                  
                  *::-webkit-scrollbar {
                    width: 8px;
                    height: 8px;
                  }
      
                  ${WangEditorCssStr}
                  ${WangEditorViewCssStr}
                </style>
                <script src="${reactUrl}"><\/script>
                <script src="${reactDOMUrl}"><\/script>
                <script src="${wangEditorUrl}"><\/script>
                <script src="${wangEditorReactUrl}"><\/script>
              </head>
              <body>
                <div id="${editorId}"></div>
              </body>
            </html>`,
        ],
        {
          type: 'text/html',
        },
      ),
    );

    frameRef.current!.src = iframeUrl;

    return () => {
      frameRef?.current?.removeEventListener('load', onLoad);
      URL.revokeObjectURL(iframeUrl);
      URL.revokeObjectURL(reactUrl);
      URL.revokeObjectURL(reactDOMUrl);
      URL.revokeObjectURL(wangEditorUrl);
      URL.revokeObjectURL(wangEditorReactUrl);
    };
  }, []);

  useUpdateEffect(() => {
    editorVal.current = value;

    if (isMount.current) {
      render().then(() => {});
    }
  }, [value]);

  useUpdateEffect(() => {
    if (isMount.current) {
      render().then(() => {});
    }
  }, [toolbarConfig, editorConfig]);

  //销毁editor
  useEffect(
    () => () => {
      if (editor.current === null) return;

      editor.current?.destroy();

      editor.current = null;

      render();
    },
    [editor],
  );

  return (
    <div className={classNames(className)} ref={wrapRef}>
      <iframe
        className={styles.WangEditorFrame}
        ref={frameRef}
        style={{
          width,
          height,
        }}
        title="富文本编辑器"
      ></iframe>
    </div>
  );
};

const MemoWangEditor = memo(forwardRef<unknown, IWangEditorFrameProps>(WangEditorFrame));

export default MemoWangEditor;
