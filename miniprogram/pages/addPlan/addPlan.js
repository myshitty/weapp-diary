// pages/addPlan/addPlan.js
const toLunar = require('../../utils/lunar.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    yearArr: [],
    yearArrIndex: 4,
    monthArr: [],
    monthArrIndex: 4,
    oneArr: [],
    twoArr: [],
    threeArr: [],
    fourArr: [],
    fiveArr: [],
    sixArr: [],
    ifAdd: true,
    chooseInfo: {},
    status: 0,
    noticeBol: true,
    level: 0,
    startTime: '16:16',
    startDate: '2020-03-07',
    endTime: '16:16',
    endDate: '2020-03-07',
    statusArr: ['未开始','进行中','已结束'],
    levelArr: ['普通','一般','重要','很重要','非常重要']  
    
  },

  // 修改当前状态
  bindPickerChange1(e) {
    // console.log(e);
    this.setData({
      status: e.detail.value
    })
  },

  // 修改提醒状态
  changeNotice(e) {
    console.log(e);
    this.setData({
      noticeBol: e.detail
    })
  },


  // 修改重要等级
  bindPickerChange2(e) {
    // console.log(e);
    this.setData({
      level: e.detail.value
    })
  },

  // 修改开始日期
  bindPickerChange3(e) {
    this.setData({
      startDate: e.detail.value
    })
  },
  // 修改开始时间
  bindPickerChange4(e) {
    this.setData({
      startTime: e.detail.value
    })
  },

  // 修改结束日期
  bindPickerChange5(e) {
    this.setData({
      endDate: e.detail.value
    })
  },
  // 修改结束时间
  bindPickerChange6(e) {
    this.setData({
      endTime: e.detail.value
    })
  },

  // 初始化年份
  inityear(yearType,monthType) {
    // yearType是年份，init表示添加
    // monthType是月份，init表示添加
    if (yearType == 'init') {
      let date = new Date();
      let year = date.getFullYear();
      let arr = [];
      for (var i = 2016; i <= year; i++) {
        arr.push(i + '年')
      }
      this.setData({
        yearArr: arr
      })

      this.initMonth(monthType);
    }
    // 编辑
    else {

    }
  },


  // 初始化月份
  initMonth(monthType) {
    let chineseMonthArr = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
    this.setData({
      monthArr: chineseMonthArr
    })
    // 初始化添加，所以我们获取当前月份
    if(monthType == 'init') {
      let date = new Date();
      let month = date.getMonth() + 1;
      let monthArr = [1,2,3,4,5,6,7,8,9,10,11,12];
      let index = 0;
      for(let i=0; i<monthArr.length; i++) {
        if(month == monthArr[i]) {
          index = i;
        }
      }
      this.setData({
        monthArrIndex: index
      })
    }
    //编辑添加，我们使用用户数据
    else {

    }

    this.getMonthDetail()
  },

  changeYear(e) {
    this.setData({
      yearArrIndex: e.detail.value
    })
    this.getMonthDetail()
  },
  changeMonth(e) {
    this.setData({
      monthArrIndex: e.detail.value
    })
    this.getMonthDetail()
  },

  // 获得当前月份详细天数
  getMonthDetail() {
    // 先得到当前月份，因为会变，所以使用index来确定
    let monthArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    let monthIndex = this.data.monthArrIndex;
    let month = monthArr[monthIndex] - 1;

    // 获得年份，和上面一样
    let date1 = new Date();
    let thisYear = date1.getFullYear();
    let yearArr = [];
    for (var i = 2016; i <= thisYear; i++) {
      yearArr.push(i);
    }
    let yearIndex = this.data.yearArrIndex;
    let year = yearArr[yearIndex];

    //初始化当前年份，当前月份一号的date
    let date = new Date(year,month,1);

    // 获取是周几
    let day = date.getDay();

    if(day == 0) {
      this.initWeekJson(year,month,6)
    }
    else if(day == 1) {
      this.initWeekJson(year, month, 0)
    }
    else if (day == 2) {
      this.initWeekJson(year, month, 1)
    }
    else if (day == 3) {
      this.initWeekJson(year, month, 2)
    }
    else if (day == 4) {
      this.initWeekJson(year, month, 3)
    } 
    else if (day == 5) {
      this.initWeekJson(year, month, 4)
    }      
    else if (day == 6) {
      this.initWeekJson(year, month, 5)
    }

  },

  // 6行week数据生成
  initWeekJson(year,month,index) {
    let thisDay = new Date().getDate();
    let thisYear = new Date().getFullYear();
    let thisMonth = new Date().getMonth() + 1;

    let days = 0;
    let prevDays = 0;
    let nextDays = 0;
    let weekArr = [
    ]

    // 首先通过year,month确定上一个是几月份，有多少天
    // 判断是不是闰年

    /*开始获取本月天数*/
    days = this.getDays(year,month+1);
    /*获取到了本月天数*/


    /*开始获取上月天数*/
    prevDays = this.getDays(year, month);
    /*获取到了上月天数*/

    /*开始获取下月天数*/
    nextDays = this.getDays(year, month+2);
    /*获取到了下月天数*/

    console.log(prevDays,days,nextDays)

    // 我们需要利用index来进行数据添加
    // index = 6 取 上个月后6天
    // ...

    if (year == thisYear && month + 1 == thisMonth) {
      this.getDaysArr('first', index, prevDays, days, nextDays, beginDay, thisDay, 'yes', year, month);
    }
    else {
      this.getDaysArr('first', index, prevDays, days, nextDays, beginDay, thisDay, 'no', year, month);
    }
    

    // 先处理剩下天数
    let moreDays = days;
    let beginDay = 1;
    if(index == 6) {
      moreDays = days - 1;
      beginDay = 2;
    }

    if (index == 0) {
      moreDays = days - 7;
      beginDay = 8;
    }

    if (index == 1) {
      moreDays = days - 6;
      beginDay = 7;
    }

    if (index == 2) {
      moreDays = days - 5;
      beginDay = 6;
    }

    if (index == 3) {
      moreDays = days - 4;
      beginDay = 5;
    }

    if (index == 4) {
      moreDays = days - 3;
      beginDay = 4;
    }

    if (index == 5) {
      moreDays = days - 2;
      beginDay = 3;
    }

    // 有多少个整数周
    let weekLength = parseInt(moreDays / 7);
    // 最后还剩下几天
    let weekMoreDays = moreDays % 7;

    // 只有三排完整，最后两排搜需要合并处理
    if(weekLength == 3) {
      for (let a = 1; a <= weekLength; a++) {
        // console.log(a);
        if(year == thisYear && month+1 == thisMonth) {
          this.getDaysArr('normal', a, prevDays, days, nextDays, beginDay, thisDay, 'yes',year,month);
        }
        else {
          this.getDaysArr('normal', a, prevDays, days, nextDays, beginDay, thisDay, 'no', year, month);
        }
        
      }
      if (year == thisYear && month + 1 == thisMonth) {
        this.getDaysArr('special', index, prevDays, days, nextDays, weekMoreDays, thisDay, 'yes', year, month);
        this.getDaysArr('next', index, prevDays, days, nextDays, weekMoreDays, thisDay, 'yes', year, month);
      }
      else {
        this.getDaysArr('special', index, prevDays, days, nextDays, weekMoreDays, thisDay, 'no', year, month);
        this.getDaysArr('next', index, prevDays, days, nextDays, weekMoreDays, thisDay, 'no', year, month);
      }
      
    }
    // 四排完整
    else if(weekLength == 4) {
      for (let a = 1; a <= weekLength; a++) {
        // console.log(a);
        if (year == thisYear && month + 1 == thisMonth) {
          this.getDaysArr('normal', a, prevDays, days, nextDays, beginDay, thisDay, 'yes', year, month);
        }
        else {
          this.getDaysArr('normal', a, prevDays, days, nextDays, beginDay, thisDay, 'no', year, month);
        }
        
      }
      if (year == thisYear && month + 1 == thisMonth) {
        this.getDaysArr('last', index, prevDays, days, nextDays, weekMoreDays, thisDay, 'yes', year, month);
      }
      else {
        this.getDaysArr('last', index, prevDays, days, nextDays, weekMoreDays, thisDay, 'no', year, month);
      }
      
    }
    

  },

  getDays(year,month) {
    let days = 0;
    let m = month;
    // 表示本月是1月份
    if(m == 0) {
      m = 12;
    }
    if (year % 4 == 0) {
      // 是
      if (m == 2) {
        days = 29;
      }
    }
    else {
      //不是
      if (m == 2) {
        days = 28;
      }
    }

    if (m == 1) {
      days = 31;
    }
    else if (m == 3) {
      days = 31;
    }
    else if (m == 4) {
      days = 30;
    }
    else if (m == 5) {
      days = 31;
    }
    else if (m == 6) {
      days = 30;
    }
    else if (m == 7) {
      days = 31;
    }
    else if (m == 8) {
      days = 31;
    }
    else if (m == 9) {
      days = 30;
    }
    else if (m == 10) {
      days = 31;
    }
    else if (m == 11) {
      days = 30;
    }
    else if (m == 12) {
      days = 31;
    }
    console.log(year,month,days);
    return days;
  },

  getDaysArr(type, index, prevDays, days, nextDays, beginDay, d, b, year, month) {
    console.log(year,month+1)
    let oneArr = [];
    let twoArr = [];
    let threeArr = [];
    let fourArr = [];
    let fiveArr = [];
    let sixArr = [];
    // let index = 0
    // type是用来判断是月初还是月底还是正常周
    if(type == 'first') {
      // 上个月末尾天数添加
      for (let i = 0; i < index; i++) {
        // 当为一月份的时候，那上个月就是去年了;
        if(month+1 == 1) {
          // console.log('去年:' + year - 1, 12+'月');

          let obj = {
            year: year-1,
            month: 12,
            day: prevDays - i,
            show: 'hide',
            choose: false,
            lunar: toLunar.toLunar(year-1, 12, prevDays - i),
            planArr: []
          }
          oneArr.unshift(obj)

        }
        // 否则就是今年，上个月
        else {
          // console.log('今年:' + year, month + '月');

          let obj = {
            year: year,
            month: month,
            day: prevDays - i,
            show: 'hide',
            choose: false,
            lunar: toLunar.toLunar(year, month, prevDays - i),
            planArr: []
          }
          oneArr.unshift(obj)
        }

        
      }
      //本月月初天数添加
      for(let j=7; j>index; j--) {
        if(b == 'yes') {
          if (7 - j + 1 == d) {
            let obj = {
              year: year,
              month: month + 1,
              day: 7 - j + 1,
              show: 'block',
              choose: true,
              lunar: toLunar.toLunar(year, month+1, 7 - j + 1),
              planArr: []
            }
            oneArr.push(obj);
            this.setData({
              chooseInfo: obj.lunar
            })
          }
          else {
            let obj = {
              year: year,
              month: month + 1,
              day: 7 - j + 1,
              show: 'block',
              choose: false,
              lunar: toLunar.toLunar(year, month+1, 7 - j + 1),
              planArr: []
            }
            oneArr.push(obj)
          }
        }else {
          let obj = {
            year: year,
            month: month + 1,
            day: 7 - j + 1,
            show: 'block',
            choose: false,
            lunar: toLunar.toLunar(year, month + 1, 7 - j + 1),
            planArr: []
          }
          oneArr.push(obj)
        }
      }
      this.setData({
        oneArr: oneArr
      })
    }
    else if(type == 'normal') {
      // console.log(index)
      for (let i = beginDay + ((index - 1) * 7); i < beginDay + index * 7; i++) {
        let obj = {};
        if(b == 'yes') {
          if(i == d) {
            obj = {
              year: year,
              month: month + 1,
              day: i,
              show: 'block',
              choose: true,
              lunar: toLunar.toLunar(year, month + 1, i),
              // lunar: 'a',
              planArr: []
            }
            this.setData({
              chooseInfo: obj.lunar
            })
          }
          else {
            // console.log('测试：', year, month + 1, i)
            obj = {
              year: year,
              month: month + 1,
              day: i,
              show: 'block',
              choose: false,
              lunar: toLunar.toLunar(year, month + 1, i),
              // lunar: 'a',
              planArr: []
            }
          }
        }
        else {
          // console.log('测试：', year, month + 1, i)
          obj = {
            year: year,
            month: month + 1,
            day: i,
            show: 'block',
            choose: false,
            lunar: toLunar.toLunar(year, month + 1, i),
            // lunar: 'a',
            planArr: []
          }
        }

        
        if(index == 1) {
          twoArr.push(obj);
          this.setData({
            twoArr: twoArr
          })
        }
        else if (index == 2) {
          threeArr.push(obj);
          this.setData({
            threeArr: threeArr
          })
        }
        else if (index == 3) {
          fourArr.push(obj);
          this.setData({
            fourArr: fourArr
          })
        }
        else if (index == 4) {
          fiveArr.push(obj);
          this.setData({
            fiveArr: fiveArr
          })
        }
      }
    }
    else if(type == 'last') {
      // 这个月末尾天数添加
      for (let i = days - beginDay; i < days; i++) {
        if(b == 'yes') {
          if(d == i+1) {
            let obj = {
              year: year,
              month: month + 1,
              day: i + 1,
              show: 'block',
              choose: true,
              lunar: toLunar.toLunar(year, month + 1, i+1),
              planArr: []
            }
            sixArr.push(obj)
            this.setData({
              chooseInfo: obj.lunar
            })
          }
          else {
            let obj = {
              year: year,
              month: month + 1,
              day: i + 1,
              show: 'block',
              choose: false,
              lunar: toLunar.toLunar(year, month + 1, i+1),
              planArr: []
            }
            sixArr.push(obj)
          }
        }
        else {
          let obj = {
            year: year,
            month: month + 1,
            day: i + 1,
            show: 'block',
            choose: false,
            lunar: toLunar.toLunar(year, month + 1, i+1),
            planArr: []
          }
          sixArr.push(obj)
        }
        
      }
      //下月月初天数添加
      for (let j = 1; j <= 7-beginDay; j++) {

        // 判断下个月是否是明年 month + 1 == 12?
        // 是：year: year+1, month：1月
        if(month + 1 == 12) {
          // console.log('明年:' + year+1, '1月');
          let obj = {
            year: year + 1,
            month: 1,
            day: j,
            show: 'hide',
            choose: false,
            lunar: toLunar.toLunar(year+1, 1, j),
            planArr: []
          }
          sixArr.push(obj)
        }

        // 不是： year: year, month: month + 2
        else {
          // console.log('今年:' + year, month+2 + '月');
          let obj = {
            year: year,
            month: month + 2,
            day: j,
            show: 'hide',
            choose: false,
            lunar: toLunar.toLunar(year, month+2, j),
            planArr: []
          }
          sixArr.push(obj)
        }

        
      }
      this.setData({
        sixArr: sixArr
      })
    }
    else if (type == 'special') {
      // 这个月末尾天数添加
      for (let i = days - beginDay; i < days; i++) {
        
        if(b == 'yes') {
          if(d == i+1) {
            let obj = {
              year: year,
              month: month + 1,
              day: i + 1,
              show: 'block',
              choose: true,
              lunar: toLunar.toLunar(year, month+1, i+1),
              planArr: []
            }
            fiveArr.push(obj)
            this.setData({
              chooseInfo: obj.lunar
            })
          }
          else {
            let obj = {
              year: year,
              month: month + 1,
              day: i + 1,
              show: 'block',
              choose: false,
              lunar: toLunar.toLunar(year, month + 1, i + 1),
              planArr: []
            }
            fiveArr.push(obj)
          }
        }
        else {
          let obj = {
            year: year,
            month: month + 1,
            day: i + 1,
            show: 'block',
            choose: false,
            lunar: toLunar.toLunar(year, month + 1, i + 1),
            planArr: []
          }
          fiveArr.push(obj)
        }

      }
      //下月月初天数添加
      for (let j = 1; j <= 7 - beginDay; j++) {

        // lunar: toLunar.toLunar(year, month + 2, j),

        if (month + 1 == 12) {
          let obj = {
            year: year+1,
            month: 1,
            day: j,
            show: 'hide',
            choose: false,
            lunar: toLunar.toLunar(year+1, 1, j),
            planArr: []
          }
          fiveArr.push(obj)
        }
        else {
          let obj = {
            year: year,
            month: month + 2,
            day: j,
            show: 'hide',
            choose: false,
            lunar: toLunar.toLunar(year, month + 2, j),
            planArr: []
          }
          fiveArr.push(obj)
        }

        
      }
      this.setData({
        fiveArr: fiveArr
      })
    }
    else if (type == 'next') {
      // 下月一周天数添加
      for (let i = 7 - beginDay; i < 7 - beginDay + 7; i++) {
        
        if(month + 1 == 12) {
          let obj = {
            year: year + 1,
            month: 1,
            day: i + 1,
            show: 'none',
            choose: false,
            lunar: toLunar.toLunar(year+1, 1, i+1),
            planArr: []
          }
          sixArr.push(obj)
        }
        else {
          let obj = {
            year: year,
            month: month + 2,
            day: i + 1,
            show: 'none',
            choose: false,
            lunar: toLunar.toLunar(year, month + 2, i+1),
            planArr: []
          }
          sixArr.push(obj)
        }

        
      }
      this.setData({
        sixArr: sixArr
      })
    }

    // console.log(oneArr, twoArr, threeArr, fourArr, fiveArr, sixArr);

  },

  changeChoose(e) {
    // console.log(e);
    let one = this.data.oneArr;
    let two = this.data.twoArr;
    let three = this.data.threeArr;
    let four = this.data.fourArr;
    let five = this.data.fiveArr;
    let six = this.data.sixArr;

    let arr = e.currentTarget.dataset.arr;
    let index = e.currentTarget.dataset.index;

    one = this.trueToFalse(one);
    two = this.trueToFalse(two);
    three = this.trueToFalse(three);
    four = this.trueToFalse(four);
    five = this.trueToFalse(five);
    six = this.trueToFalse(six);

    if(arr == 'oneArr') {
      one[index].choose = true; 
      this.setData({
        chooseInfo: one[index].lunar
      })
      this.getUserPlan(one[index])
      this.getDayInfo(one[index])
    }

    else if(arr == 'twoArr') {
      two[index].choose = true; 
      this.setData({
        chooseInfo: two[index].lunar
      })
      this.getUserPlan(two[index])
      this.getDayInfo(two[index])
    }

    else if (arr == 'threeArr') {
      three[index].choose = true; 
      this.setData({
        chooseInfo: three[index].lunar
      })
      this.getUserPlan(three[index])
      this.getDayInfo(three[index])
    }

    else if (arr == 'fourArr') {
      four[index].choose = true; 
      this.setData({
        chooseInfo: four[index].lunar
      })
      this.getUserPlan(four[index])
      this.getDayInfo(four[index])
    }

    else if (arr == 'fiveArr') {
      five[index].choose = true; 
      this.setData({
        chooseInfo: five[index].lunar
      })
      this.getUserPlan(five[index])
      this.getDayInfo(five[index])
    }

    else if (arr == 'sixArr') {
      six[index].choose = true; 
      this.setData({
        chooseInfo: six[index].lunar
      })
      this.getUserPlan(six[index])
      this.getDayInfo(six[index])
    }

    this.setData({
      oneArr: one,
      twoArr: two,
      threeArr: three,
      fourArr: four,
      fiveArr: five,
      sixArr: six,
    })

    

  },

  getUserPlan(val) {

  },

  getDayInfo(val) {

  },

  trueToFalse(arr) {
    for(var i=0; i<arr.length; i++) {
      arr[i].choose = false;
    }
    return arr;
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.inityear('init','init');
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})