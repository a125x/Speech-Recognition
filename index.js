//I really tried to make an electron app and it even works,
//but unfortunately chromium doesn't have pre-installed
//google speech api and using it costs real money
//So basically this file is useless...
const { app, BrowserWindow } = require('electron')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600
  })

  win.loadFile('index.html')
  //for debugging purposes
  win.webContents.openDevTools()
}

//some strange things happens on macs and this should solve it
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})