import type { AWS } from "@serverless/typescript";

const serverlessConfiguration: AWS = {
  service: "service",
  frameworkVersion: "3",
  provider: {
    name: "aws",
    runtime: "nodejs18.x",
    stage: '${opt:stage, "dev"}',
    region: '${opt:region, "us-east-1"}' as any,
  },
  functions: {
    "create-user": {
      handler: "./src/handlers/user/create.handler",
      events: [
        {
          http: {
            path: "users",
            method: "post",
            cors: true,
          },
        },
      ],
      timeout: 900,
    },
  },
  plugins: ["serverless-esbuild", "serverless-offline"],
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ["aws-sdk", "nock", "mock-aws-s3"],
      target: "node18",
      define: { "require.resolve": undefined },
      platform: "node",
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;
