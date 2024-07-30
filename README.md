## 介紹
- 這是簡易影片數據觀看網頁。  
- 使用 Nextjs 框架，CSS部分使用 tailwind 進行修飾，串接API的部分是使用 rect-query 套件，數據圖顯示部分是使用 recharts 套件，部屬在 Vercel。  
- 使用者在此專案可以進行搜尋youtube的頻道，搜尋資料最多只有50筆分了10頁，可以讓使用者挑選想比對數據的頻道，頻道可以按下儲存或著在儲存列可以刪除，數據分析頁滑鼠移到各個頻道的長條圖可以看到三種數據的數值，分別是頻道影片總數、頻道訂閱總數、頻道總觀看數，並在上方可以挑選你要觀看的數據，若選錯頻道也可以在下方的儲存列進行移除。  
- 本專案是前端開發之專案。  

## 產品功能
1. 使用者可以搜尋youtube頻道。  
2. 使用者可以把youtube頻道加入到儲存列，在儲存列中可以刪除頻道。  
3. 使用者可以在數據分析頁面觀看儲存列的數據，分別是頻道影片總數、頻道訂閱總數、頻道總觀看數。    
4. 使用者可以在數據分析頁面的長條圖上方選擇要看的數據。  
5. 使用者可以在數據分析頁面刪除儲存列的頻道，長條圖也會跟著改變。  

## 專案開發人員
[Snow](https://github.com/SnowWuChiKuo)  

## 部屬  
[vercel](https://youtube-data-murex.vercel.app/)  

## 專案本地安裝流程
1. 請確認電腦已經安裝 Node.js、npm  
2. 打開終端機，輸入以下指令將專案 clone 到本地  
   ```
   git clone https://github.com/SnowWuChiKuo/youtube-data
   ```
3. 終端機移動至專案資料夾，輸入指令安裝套件  
   ```
   cd 專案資料夾  
   npm install
   ```
4. 新增.env檔案，根據.env.example補足所需變數設定  
   ```
   NEXT_PUBLIC_YOUTUBE_KEY=
   ```
5. 啟動前端 
   ```
   npm run dev 
   ```
6. 若跑出以下字串代表運行成功  
   ```
   http://localhost:3000  
   ```

## 前端開發工具
tanstack/react-query: v5.50.1  
next: v14.2.4  
react: v18  
react-dom: v18  
react-router-dom: v6.25.0  
recharts: v2.12.7  
eslint: v8  
eslint-config-next: v14.2.4  
postcss: v8  
tailwindcss: v3.4.1  