import is from '../is';

/**
 * 将树铺平
 * @param { Object } tree
 * @returns { Array } list
 * @author gongjian.gj
 */
export const tree2list = tree => tree.children ?
  tree.children.reduce( (ret, el) => [...ret, ...tree2list(el)], [tree]) : [tree]

/**
 * 多叉树剪枝
 * @param { Array(Tree) } tree
 * @param{ Number } maxLevel
 * @param{ Number } currentLevel
 * @return { Array(Tree) } cutTree
 * @author gongjian.gj
 */
export const cutTree = (treeList, maxLevel, currentLevel = 1) => {
  if (maxLevel > currentLevel) {
    return treeList.map( tree => !is.emptyArr(tree.children) && tree.children ? ({
      ...tree,
      children: cutTree(tree.children, maxLevel, currentLevel + 1)
    }) : tree )
  } else {
    return treeList.map(tree => {
      /*eslint-disable */
      const { children, ...others } = tree
      /* eslint-enable */

      return {
        ...others,
        isLeaf: true
      }
    })
  }
}

/**
 * 广度优先搜索树
 * @param { Array(Tree) } treeList
 * @param { Number } id
 * @returns { Object(Tree) } search
 * @author gongjian.gj
 */
// todo: cps
export const findNodeBfs = (id, treeList) => {
  let nextTree = []

  for (let i = 0; i < treeList.length; i++) {
    const el = treeList[i]

    if (el.id === id) {
      return el
    } else if (el.children) {
      nextTree = [...el.children, ...nextTree]
    }
  }

  if (!is.emptyArr(nextTree)) {
    return findNodeBfs(id, nextTree)
  } else {
    return []
  }
}
/**
 * 多叉树寻径
 * @param { Object(Tree) } tree
 * @param { String } path
 * @returns { Array } 树路径
 * @author gongjian.gj
 */
export const getTreePath = (tree, path = [], options = {}) => {
  const { key = 'value', onlyNeedChecked = false } = options
  const concatPathTree = [...path, tree[key]]
  const getJoinString = concatPathTree.join('.')

  if (!tree) return ['']
  if (!tree.children || is.emptyArr(tree.children)) {
    return [getJoinString]
  }
  if (onlyNeedChecked && tree.isSelected) {
    return [getJoinString]
  }

  return tree.children
    .reduce((ret, el) => [...ret, ...getTreePath(el, concatPathTree, options)], [])
}

export const getTreeLeaf = (tree = {}, options = {}) => {
  const { onlyNeedChecked = false } = options

  if (!tree.children || is.emptyArr(tree.children)) {
    return [tree]
  }
  if (onlyNeedChecked && tree.isSelected) {
    return [tree]
  }

  return tree.children.reduce((ret, el) => [...ret, ...getTreeLeaf(el, options)], [])
}

export const getLeafNode = (treeList = [], options) =>
  treeList.reduce((ret, tree) => [...ret, ...getTreeLeaf(tree, options)], [])

  /**
    * 树节点遍历
    * @param { Object(Tree) } tree
    * @param { Func } mapFunc 树节点映射函数
    * @returns { Object(Tree) } 树结构
    * @author gongjian.gj
    */
export const treeIter = (tree, mapFunc = e => e) => {
  if (!tree.children || is.emptyArr(tree.children)) {
    return mapFunc(tree)
  }

  return { ...mapFunc(tree), children: tree.children.map(el => treeIter(el, mapFunc)) }
}

/**
  * 树列表节点遍历
  * @param { Array(Tree) } treeList
  * @param { Func } mapFunc 树节点映射函数
  * @returns { Object(Tree) } 树结构
  * @author gongjian.gj
  */
export const treeListIter = (treeList, mapFunc = e => e) => treeList.map(el => treeIter(el, mapFunc))

/**
  * 获取树的深度
  * @param { Array(Tree) } treeList
  * @returns { Number } 树深度
  * @author gongjian.gj
  */
export const getTreeDepth = (treelist = [], deepth = 0) => {
  if (is.emptyArr(treelist)) {
    return deepth
  }

  return getTreeDepth(treelist.reduce((ret, el) => [...ret, ...(el.children || [])], []), deepth + 1)
}
