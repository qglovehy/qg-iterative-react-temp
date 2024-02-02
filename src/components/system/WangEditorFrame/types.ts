export interface IWangEditorFrameProps {
  value?: string;
  width?: string;
  height?: string;
  bordered?: boolean;
  readOnly?: boolean;
  className?: string;
  toolbarConfig?: {};
  editorConfig?: {
    placeholder: string;
    MENU_CONF: {
      uploadImage: {};
    };
  };
  onChange?: (e: any) => void;
  onCreated?: (e: any) => void;
}

export interface IDomEditor {
  insertData: (data: DataTransfer) => void;
  setFragmentData: (data: Pick<DataTransfer, 'getData' | 'setData'>) => void;
  getAllMenuKeys: () => string[];
  handleTab: () => void;
  getHtml: () => string;
  getText: () => string;
  getSelectionText: () => string;
  isEmpty: () => boolean;
  clear: () => void;
  dangerouslyInsertHtml: (html: string, isRecursive?: boolean) => void;
  setHtml: (html: string) => void;
  id: string;
  isDestroyed: boolean;
  isFullScreen: boolean;
  focus: (isEnd?: boolean) => void;
  isFocused: () => boolean;
  blur: () => void;
  updateView: () => void;
  destroy: () => void;
  scrollToElem: (id: string) => void;
  showProgressBar: (progress: number) => void;
  hidePanelOrModal: () => void;
  enable: () => void;
  disable: () => void;
  isDisabled: () => boolean;
  toDOMNode: (node: Node) => HTMLElement;
  fullScreen: () => void;
  unFullScreen: () => void;
  select: (at: Location) => void;
  deselect: () => void;
  move: (distance: number, reverse?: boolean) => void;
  moveReverse: (distance: number) => void;
  restoreSelection: () => void;
  isSelectedAll: () => boolean;
  selectAll: () => void;
  emit: (type: string, ...args: any[]) => void;
  undo?: () => void;
  redo?: () => void;
}
