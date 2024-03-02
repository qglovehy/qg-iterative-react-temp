interface AntdComponentTheme {
  colorPrimary: string;
  algorithm?: boolean;
}

interface AntdTheme {
  token: {
    colorPrimary: string;
    borderRadius: number;
  };
  components: {
    Button: AntdComponentTheme;
    Input: AntdComponentTheme;
  };
}

interface ProjectTheme {
  colorPrimary: string;
}

interface CounterState {
  value: {
    token: string;
    username: string;
    roleType: string;
    dict: Array<Map<any, any>>; // 请替换 any 以反映 Map 的键和值的实际类型
    currentMenuItem: string;
    collapsed: boolean;
    menuWidth: number;
    loading: boolean;
    loadingText: string;
    openMenuDraw: boolean;
    socketId: string | null;
    breadcrumb: Array<any>; // 请替换 any 以反映面包屑数据的实际类型
    Itemtype: string;
    antdTheme: AntdTheme;
    projectTheme: ProjectTheme;
  };
}

// 如果您有一个根状态包含多个 reducers
export interface IRootStateProps {
  counter: CounterState;
}
