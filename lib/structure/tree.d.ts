export interface Tree {
  children: Array<Tree>;
  id: number | string;
  name: string | number;
  isLeaf: boolean;
}

export interface TreeOptions {
  // 子节点全部选中，是否仅显示父节点
  onlyNeedChecked: boolean;
  key: string;
}

export const tree2list: (tree: Tree) => Array<Tree>;
export const cutTree: (treelist: Array<Tree>, maxLevel: number, currentLevel: number) => Array<Tree>;
export const findNodeBfs: (id: number | string, treelist: Array<Tree>) => Tree | undefined;
export const getTreePath: (tree: Tree, path: Array<string>, options: TreeOptions) => Array<string>;
export const getTreeLeaf: (tree: Tree, options: TreeOptions) => Array<Tree>;
export const getLeafNode: (treeList: Array<Tree>, options: TreeOptions) => Array<Tree>;
export const treeIter: (tree: Tree, mapFunc: ((e: Tree) => Tree)) => Tree;
export const treeListIter: (treeList: Array<Tree>,  mapFunc: ((e: Tree) => Tree)) => Array<Tree>;
export const getTreeDepth: (treeList: Array<Tree>, deepth: number) => number;
