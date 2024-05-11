// TradingViewWidget.jsx
import React, { useEffect, useRef, memo, useState } from 'react';

function TradingViewWidget({ products, namegraph }) {
  const container = useRef();

  useEffect(
    () => {
      const dataChart = async () => {
        try {
          const script = document.createElement("script");
          
          script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
          script.type = "text/javascript";
          script.async = true;
          
          script.innerHTML = `
            {
              "width": "100%",
              "height": "100%",
              "symbol": "${ products }",
              "interval": "${localStorage.getItem('ChInterval', '1')}",
              "timezone": "Etc/UTC",
              "theme": "dark",
              "style": "${localStorage.getItem('GraphName', '2')}",
              "locale": "en",
              "enable_publishing": false,
              "hide_top_toolbar": true,
              "hide_legend": true,
              "save_image": false,
              "calendar": false,
              "hide_volume": true,
              "support_host": "https://www.tradingview.com"
            }`;
            
          container.current.appendChild(script);
          
        } catch (error) {
          console.log(error);
        }
      }
      dataChart()
    },
    []
  );

  return (
    <div className="ch-wrapper">
      <div className="tradingview-widget-container" ref={container}>
        <div className="tradingview-widget-container__widget"></div>
      </div>
    </div>
  );
}

export default memo(TradingViewWidget);