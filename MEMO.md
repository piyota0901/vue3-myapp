# FlexBox
- Flexコンテナ
  - CSSで`display:flex`を設定した親要素の部分を指す
  - 以下のプロパティを指定したりする
    - flex-direction
    - flex-wrap
    - flex-flow
    - align-items
- Flexアイテム
  - Flexコンテナを親要素とする子要素

# Grid System
- 階層構造は以下
  - `v-container` > `v-row` > `v-col`
- `col`は１２個ある。
  - `Vuetify comes with a 12 point grid system built using flexbox`
- `<v-col cols="xxx">`のxxxに何個のグリッドポイントを使うか指定できる。

参考：https://reffect.co.jp/vue/vuetify-grid-system


# Vuetify

## Labs
`Labs`は開発途中で実験的に使用可能なものになる。
`Data-Table`はその一つ。
```vue
<script setup>
const headers = [
    {
    title: 'Dessert (100g serving)',
    align: 'start',
    sortable: false,
    key: 'name',
    },
    { title: 'Calories', align: 'end', key: 'calories' },
    { title: 'Fat (g)', align: 'end', key: 'fat' },
    { title: 'Carbs (g)', align: 'end', key: 'carbs' },
    { title: 'Protein (g)', align: 'end', key: 'protein' },
    { title: 'Iron (%)', align: 'end', key: 'iron' },
];
const desserts = [
    {
    name: 'Frozen Yogurt',
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    iron: '1',
    },
    {
    name: 'Jelly bean',
    calories: 375,
    fat: 0.0,
    carbs: 94,
    protein: 0.0,
    iron: '0',
    },
];
</script>
<template>
<div>
    <h2 class="d-flex justify-center">Todo一覧</h2>
    <div class="d-flex justify-center">
    <!-- v-data-tableは開発途中みたい。実験的には使える -->
    <!-- https://vuetifyjs.com/en/labs/introduction/ -->
    <v-data-table 
        :headers="headers"
        :items="desserts"
        item-value="name"
        class="elevation-1"
        >
    </v-data-table>
    </div>
</div>
</template>
```

## validation
バリデーションのライブラリとして
`vee-validate`がある。

- Vue3に対応しているのは`version4`の模様
  - https://vee-validate.logaretm.com/v4/tutorials/basics/

- `vee-validate`でのバリデーションでハマったこと
  - usefieldはリアクティブなのはわかるが、objectをreactiveとしたときにプロパティ分のusefieldを作成する必要があるのか。
  - storeで状態管理まで行う例があった
    - https://stackblitz.com/edit/vee-validate-v4-pinia?file=src%2Fstores.ts






## Text Alignment
https://vuetifyjs.com/en/styles/text-and-typography/#text
各タグの文字位置は、`class`属性で制御する。

## Dialog
表示位置は`origin`で設定する模様
https://vuetifyjs.com/en/api/v-dialog/#props-origin