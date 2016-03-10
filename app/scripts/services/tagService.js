'use strict';

/**
 * @ngdoc function
 * @name ChalkV2.service:TagService
 * @description
 * # TagService
 */
angular.module('ChalkV2')
  .factory('TagService', TagService);

function TagService() {
  var tagList = [
    [
      [{
          name: '早餐',
          icon: 'ion-coffee'
      },
        {
          name: '午餐',
          icon: 'ion-beer'
      },
        {
          name: '晚餐',
          icon: 'ion-wineglass'
      },
        {
          name: '交通',
          icon: 'ion-android-bus'
      },
        {
          name: '零食',
          icon: 'ion-icecream'
      }],
      [{
          name: '日常用品',
          icon: 'ion-android-cart'
      },
        {
          name: '衣物',
          icon: 'ion-tshirt'
        },
        {
          name: '社交',
          icon: 'ion-person-stalker'
        },
        {
          name: '娱乐',
          icon: 'ion-mic-b'
        },
        {
          name: '购物',
          icon: 'icon-local-mall'
        }]
      ],
      [
        [{
          name: '房租',
          icon: 'ion-ios-home'
          },
        {
          name: '电话费',
          icon: 'ion-android-call'
          },
        {
          name: '投资',
          icon: 'icon-line-chart'
          },
        {
          name: '书',
          icon: 'icon-book'
          },
        {
          name: '电影',
          icon: 'ion-android-film'
          }],
        [{
          name: '转账',
          icon: 'icon-loop'
          },
        {
          name: '仪表',
          icon: 'ion-android-happy'
          },
        {
          name: '医疗',
          icon: 'icon-local-hospital'
          },
        {
          name: '信用卡',
          icon: 'icon-cc-visa'
          },
        {
          name: 'others',
          icon: 'ion-ios-pricetag'
        }]
      ]
    ];

  function getTagList() {
    return tagList;
  }

  return {
    getTagList: getTagList
  };
}
