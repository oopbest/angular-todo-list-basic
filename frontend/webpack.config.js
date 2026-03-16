const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // 📌 Entry Point - จุดเริ่มต้นของแอป
  // Webpack จะอ่านไฟล์นี้ก่อน แล้ว trace dependencies ทั้งหมด
  entry: './src/app.js',

  // 📌 Output - กำหนดว่าจะ bundle ออกไปไว้ที่ไหน
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true, // ลบ dist เก่าก่อน build ใหม่
  },

  // 📌 Module Rules - กำหนด loader สำหรับไฟล์แต่ละประเภท
  module: {
    rules: [
      // 🔹 html-loader: แปลงไฟล์ .html ให้เป็น JavaScript string
      //    ใช้สำหรับโหลด AngularJS template เข้าใน controller
      //    ⚠️ esModule: false สำคัญมาก!
      //    html-loader v5 จะ return ES Module object { default: "..." } โดย default
      //    แต่ AngularJS ต้องการ plain string → ถ้าไม่ปิด จะเห็น [object Module]
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader',
          options: {
            esModule: false,
          },
        },
      },

      // 🔹 less-loader → css-loader → style-loader (ทำงานจากขวาไปซ้าย)
      //    less-loader  : แปลง LESS → CSS
      //    css-loader   : แปลง CSS → JavaScript module
      //    style-loader : inject CSS เข้าไปใน <style> tag ใน HTML
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
    ],
  },

  // 📌 Plugins - เครื่องมือเพิ่มเติมนอกเหนือจาก loaders
  plugins: [
    new webpack.EnvironmentPlugin({
      API_BASE_URL: 'http://localhost:3000/api',
    }),

    // HtmlWebpackPlugin: สร้าง index.html ใน dist/ อัตโนมัติ
    // และ inject <script src="bundle.js"> ให้อัตโนมัติ
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
    }),
  ],

  // 📌 DevServer - สำหรับ development (npm run dev)
  devServer: {
    port: 9000,
    hot: true, // Hot Module Replacement - reload อัตโนมัติเมื่อแก้ไขไฟล์
    open: true, // เปิด browser อัตโนมัติ
  },
};
