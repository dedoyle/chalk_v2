'use strict';

/**
 * @ngdoc function
 * @name ChalkV2.controller:ExpenseController
 * @description
 * # ExpenseController
 */
angular.module('ChalkV2')
  .controller('ExpenseController', ExpenseController);

ExpenseController.$inject = ['defaultItemsService', 'ExpenseService', '$ionicSlideBoxDelegate', '$state', '$log'];

function ExpenseController(defaultItemsService, ExpenseService, $ionicSlideBoxDelegate, $state, $log) {

  // TODO: 添加新支出后并无自动刷新列表
  // TODO: 在今日支出页面往左滑后导致右滑日期不会变化
  $log.log(defaultItemsService);
  var vm = this,
    direction = 0,
    LASTTAIL = 0,
    defaultSlidesIndexes = [-1, 0, 1],
    defaultDays = [getDay(defaultSlidesIndexes[0]), getDay(defaultSlidesIndexes[1]), getDay(defaultSlidesIndexes[1])],
    defaultSlides = [
      makeSlide(defaultSlidesIndexes[0], {
        day: defaultDays[0],
        items: defaultItemsService[defaultDays[0]]
      }),
      makeSlide(defaultSlidesIndexes[1], {
        day: defaultDays[1],
        items: defaultItemsService[defaultDays[1]]
      }),
      makeSlide(defaultSlidesIndexes[2], {
        day: defaultDays[1],
        items: defaultItemsService[defaultDays[1]]
      })],
    head, tail;

  vm.currDay = moment().format('YYYY-MM-DD');
  vm.slides = angular.copy(defaultSlides);
  vm.selectedSlide = 1;
  vm.slideChanged = slideChanged;
  vm.goToAddExpense = goToAddExpense;
  vm.goToDetail = goToDetail;
  vm.cleanup = cleanup;

  head = vm.slides[0].nr;
  tail = vm.slides[vm.slides.length - 1].nr;

  function getItem(day) {
    ExpenseService.getExpenseBy(day).then(function (res) {
      return res.docs;
    });
  }

  function makeSlide(nr, data) {
    return angular.extend(data, {
      nr: nr
    });
  }

  function getDay(days) {
    return moment().add(days, 'days').format('YYYY-MM-DD');
  }

  function createSlideData(nextDirection, oldDirection) {
    var nr;

    if (nextDirection === 1) {
      tail = oldDirection < 0 ? head + 3 : tail + 1;
    } else {
      head = oldDirection > 0 ? tail - 3 : head - 1;
    }

    nr = nextDirection === 1 ? tail : head;
    if (defaultSlidesIndexes.indexOf(nr) !== -1) {
      return defaultSlides[defaultSlidesIndexes.indexOf(nr)];
    }
    return makeSlide(nr, {
      day: getDay(nr),
      get items() {
        return getItem(this.day);
      }
    });
  }

  function slideChanged(i) {
    var previousIndex = i === 0 ? 2 : i - 1,
      nextIndex = i === 2 ? 0 : i + 1,
      nextDirection = vm.slides[i].nr > vm.slides[previousIndex].nr ? 1 : -1;

    angular.copy(
      createSlideData(nextDirection, direction),
      vm.slides[nextDirection > 0 ? nextIndex : previousIndex]
    );

    vm.currDay = vm.slides[i].day;

    function getIfromNr(nr) {
      for (var i = 0; i < vm.slides.length; i++) {
        if (vm.slides[i].nr === nr) {
          return i;
        }
      }
      return -1;
    }

    if (vm.slides[i].nr === (LASTTAIL + 1)) {
      $ionicSlideBoxDelegate.$getByHandle('slideshow-slidebox').slide(getIfromNr(LASTTAIL));
    }

    direction = nextDirection;
  }

  function goToAddExpense() {
    $state.go('app.add-or-edit', {
      day: vm.currDay,
      action: '新增支出',
      expenseId: '',
      isAdd: '1'
    });
  }

  function goToDetail(item) {
    $state.go('app.detail', {
      day: vm.currDay,
      expenseId: item._id,
      rev: item._rev
    });
  }

  function cleanup() {
    ExpenseService.destroyexpense();
    BudgetService.destroyBudget();
  }
}

//    vm.showDefaultSlides = function () {
//      var i = $ionicSlideBoxDelegate.currentIndex(),
//        previousIndex = i === 0 ? 2 : i - 1,
//        nextIndex = i === 2 ? 0 : i + 1;
//
//      angular.copy(defaultSlides[1], vm.slides[i]);
//      angular.copy(defaultSlides[0], vm.slides[previousIndex]);
//      angular.copy(defaultSlides[2], vm.slides[nextIndex]);
//      direction = 0;
//      head = vm.slides[previousIndex].nr;
//      tail = vm.slides[nextIndex].nr;
//    };
