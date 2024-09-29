import Spline from '@splinetool/react-spline/next';

export const Hero = () => {
  return (
    <div className='h-screen w-full'>
      <div className='my-[5dvh] h-[90dvh] overflow-hidden'>
        <Spline
          className='min-h-screen'
          scene='https://prod.spline.design/FbBuy8JMYMZgfPYa/scene.splinecode'
        />
      </div>
    </div>
  );
};
