import lottie from 'lottie-web';
import React, { useEffect, useRef } from 'react';

function LottieAnimation({ animationData, width = '100px' }) {
  const animationContainer = useRef(null);

  useEffect(() => {
    const anim = lottie.loadAnimation({
      container: animationContainer.current, // 容器元素
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: animationData, // 传入的Lottie JSON数据
    });

    return () => anim.destroy(); // 组件卸载时销毁动画
  }, [animationData]);

  return <div ref={animationContainer} style={{ width }}></div>;
}

export default LottieAnimation;
