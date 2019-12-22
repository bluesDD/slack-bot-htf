import * as cdk from "@aws-cdk/core";
import * as lambda from "@aws-cdk/aws-lambda";
import * as apigw from "@aws-cdk/aws-apigateway";

export class CdkWorkshopStack extends cdk.Stack {
  constructor( 
    scope: cdk.App, // 通常、thisが入る
    id: string, // 識別子、cloudformationの論理IDになる
    props?: cdk.StackProps // 初期化用プロパティ
  ) {
    super(scope, id, props); //親クラスのコンストラクタを継承する

    const hello = new lambda.Function(this, 'HelloHandler', {
      runtime: lambda.Runtime.NODEJS_10_X,
      code: lambda.Code.asset("lambda"), // lambdaディレクトリのコードを探す
      handler: "hello.handler" //ファイルと関数、今回はhelloファイルのhandler関数
    });

    new apigw.LambdaRestApi(this, "Endpoint", {
      handler: hello
    })

  
  }
}