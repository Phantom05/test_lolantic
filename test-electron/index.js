/**
 * Created by Blidkaga on 2017. 3. 19..
 */
// app모듈과, BrowserWindow 모듈 할당
const { app, BrowserWindow } = require('electron');
var execFile = require('child_process').execFile;

let win;

app.on('ready', () => {
  win = new BrowserWindow({
    width: 1300,
    height: 980,
    minWidth: 1200,
    minHeight: 860,
    maxWidth: 1500,
    maxHeight: 1100,
    show: false,
    icon: __dirname + '/../react/build/favicon.ico',
    webPreferences: { defaultFontSize: 14 },
    // frame: false,
    });

 

    // D:\dev\launcher-front\test-server
  // execute('D:\\dev\\launcher-front\\test-server\\no-internet-express-win.exe')

  win.setMenuBarVisibility(false)
  // 창이 ready 상태가되면 보여주기
  win.once('ready-to-show', function () {
    win.show();
  });
  app.on("window-all-closed", function () {
    if (process.platform !== "darwin") {
      app.quit()
    }
   });

  // 윈도우 창에 로드 할 html 페이지
  win.loadURL(`file://${__dirname}/../react/build/index.html`); //작은 따옴표가 아닌  back stick 기호(tab키 위)


  //개발자 도구 오픈
  // win.webContents.openDevTools();
});




function execute(filePath){
  return new Promise((resolve, reject) => {
    execFile(filePath,
      function (error, stdout, stderr) {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        resolve({stdout,stderr});
        if (error !== null) {
          console.log('exec error: ' + error);
          resolve(error);
        }
    });
  }); 
}


// const { app, BrowserWindow } = require('electron')

// app.disableHardwareAcceleration()

// let win

// app.whenReady().then(() => {
//   win = new BrowserWindow({
//     webPreferences: {
//       offscreen: true
//     }
//   })

//   win.loadURL('https://threejs.org/examples/#webgl_lensflares')
//   win.webContents.on('paint', (event, dirty, image) => {
//     // updateBitmap(dirty, image.getBitmap())
//   })
//   win.webContents.setFrameRate(30)
// })