Component({
  properties: {
    linkedFlag: {
      type: Boolean,
      observer(e) {
        this.setData({
          flag: e
        });
      }
    },
    // linked-datas
    linkedDatas: {
      type: Array,
      observer(newVal, oldVal) {
        this.setData({
          datas: newVal
        });
        //初始化数据
        this.initTabs();
      }
    }
  },
  data: {
    flag: false, // 是否显示flag
    datas: [], // 联动信息
    tabList: [], // 选中信息组合
    code: [], // 选中
    scrollTop: 0,
  },
  methods: {

    initTabs: function () {
      const that = this;
      const tabArray = [];
      const { datas } = this.data;
      if (datas && datas.length != 0) {
        tabArray.push({
          selectIndex: -1,
          label: '请选择',
          node: {},
          list: datas,
          scrollTop: 0,
        });
      }

      that.setData({
        tabList: tabArray,
        scrollTop: 0,
      });

    },

    // 点击遮罩层
    onCloseGoodsPopup: function (e) {
      this.setData({
        flag: false
      });
      this.triggerEvent('trigger-linked-flag', {
        flag: false
      });
      this.initTabs();
    },

    //关闭联动框
    clickClose: function (e) {
      this.setData({
        flag: false
      });
      this.triggerEvent('trigger-linked-flag', {
        flag: false
      });
      this.initTabs();
    },

    clickTabItem: function (e) {
      // 点击的第几个tab
      const that = this
      const { index } = e.target.dataset
      let { code, tabList } = that.data
      const array = [];
      if (parseInt(index) === 1) {
        code.pop()
      }
      if (parseInt(index) === 0) {
        code = []
      }
      for (let i = 0; i < index + 1; i++) {
        array.push(tabList[i]);
      }
      that.setData({
        tabList: array,
        code,
        scrollTop: 0,
      });
    },

    clickItem: function (e) {
      const that = this
      const { index } = e.target.dataset;
      const { tabList } = this.data;
      let code = []
      let pre = tabList[tabList.length - 1];
      pre.selectIndex = index;
      pre.label = pre.list[index].label;
      pre.node = pre.list[index];
      code.push(pre.node.value)
      // 判断是否有下一个
      if ((pre.list[index].children && pre.list[index].children.length != 0) || (pre.list[index].cities && pre.list[index].cities.length != 0)) {
        let next = {
          selectIndex: -1,
          label: '',
          node: {},
          list: pre.list[index].children || pre.list[index].cities
        }
        tabList.push(next);
        that.setData({
          tabList,
          code: [...that.data.code, ...code],
          scrollTop: 0,
        });
      } else {
        that.triggerEvent('trigger-linked-flag', {
          flag: false
        });
        that.triggerEvent('trigger-linked-confirm', {
          linkedInfo: tabList,
          linkedCode: [...that.data.code, ...code]
        });
        that.setData({ flag: false, code: [], tabList: []}, () => {
          that.initTabs()
        })
      }
    },
    preventTouchMove() { return }
  }
})