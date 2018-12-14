export const columns: Array<object> = [
    { prop: 'bookName', label: '书名', fixed: true },
    { prop: 'bookId', label: '书名ID', fixed: false },
    { prop: 'instrumentName', label: '乐器', fixed: false },
    { prop: 'author', label: '作者', fixed: false },
    { prop: 'seriesName', label: '系列', fixed: false },
    { prop: 'imageUrl', label: '封面', fixed: false },
    { prop: 'coursesNum', label: '乐谱数', fixed: false },
    { prop: 'musicScorePageNum', label: '乐谱页数', fixed: false },
    { prop: 'hasOnTheShelvesName', label: '状态', fixed: false },
    { prop: 'isExistIconName', label: '有无ICON', fixed: false },
    { prop: 'iconName', label: 'ICON类型', fixed: false }
]

export const statusTypes:  Array<object> = [
    {"statusName": "上架", "id": 1, "number": 0},
    {"statusName": "下架", "id": 2, "number": 1}
]

export const videoTypes:  Array<object> = [
    {"videoName": "无视频", "id": 1, "number": 0},
    {"videoName": "部分有视频", "id": 2, "number": 1},
    {"videoName": "全部有视频", "id": 3, "number": 2}
]

export const audioTypes:  Array<object> = [
    {"audioName": "无音频", "id": 1, "number": 0},
    {"audioName": "部分有音频", "id": 2, "number": 1},
    {"audioName": "全部有视音频", "id": 3, "number": 2}
]

export const checkTypes:  Array<object> = [
    // {"checkName": "全部", "id": 1, "number": 0},
    {"checkName": "未审核", "id": 2, "number": 1}
]

export const iconTypes:  Array<object> = [
    {"iconName": "否", "id": 1, "number": 0},
    {"iconName": "是", "id": 2, "number": 1}
]

export const searchTypes:  Array<object> = [
    {"searchName": "书名", "id": 1, "number": 0},
    {"searchName": "书本ID", "id": 2, "number": 1},
    {"searchName": "乐谱名", "id": 3, "number": 2}
]
export const detailSearchTypes:  Array<object> = [
    {"searchName": "乐谱名", "id": 1, "number": 0},
    {"searchName": "乐谱ID", "id": 2, "number": 1}
]

export const detailCoumns: Array<object> = [
    { prop: 'coursesname', label: '乐谱名', fixed: true },
    { prop: 'sort', label: '序号', fixed: false },
    { prop: 'coursesId', label: '乐谱ID', fixed: false },
    { prop: 'levelName', label: '级别', fixed: false },
    { prop: 'pageNum', label: '乐谱页数', fixed: false },
    { prop: 'musicFilePath', label: '音频', fixed: false },
    { prop: 'videoFilePath', label: '视频', fixed: false },
    { prop: 'hasOnTheShelvesName', label: '状态', fixed: false }
]