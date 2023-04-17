# Vee-Validate
vue3 composition apiで利用する場合は
v4.xが対応している。
https://vee-validate.logaretm.com/v4/guide/overview/

## 概要
フォームのバリデーションはフロントエンド開発における難しい課題。

## 使い方
Composition APIを使用しているため、リファレンスやサンプルは
Composition APIを参考にすればOK。

#### useFormの設定
- 無効なsumbmitをハンドリングしたいとき
    ```typescript
    import type {InvalidSubmissionContext} from 'vee-validate';

    // something

    const {handleSubmit} = useForm({
      validationSchema: simpleSchema
    });

    const onInvalidSubmit = (value: InvalidSubmissionContext) => {
    console.log("value: ",value.values); // current form values
    console.log("errors:",value.errors); // a map of field names and their first error message
    console.log("results:",value.results); // a detailed map of field names and their validation results  
    }

    const onSubmit = handleSubmit(values => {},onInvalidSubmit);
    ```
    - `handleSubmit`の第２引数にそのロジックを実装した関数を渡す。
    - Type(型)は以下より確認して、該当interfaceをimportする。
      - https://vee-validate.logaretm.com/v4/api/use-form#typescript-definition