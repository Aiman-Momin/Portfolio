import Spline from '@splinetool/react-spline';

export default function SplineScene() {
  return (
    <main style={{ position: 'relative' }}>
      <Spline
        scene="https://prod.spline.design/GXydSFLeiylTN0zF/scene.splinecode"
      />
      <div style={{
        position: 'absolute',
        bottom: '20px',
        right: '20px',
        minWidth: '150px',
        background: 'rgba(8,8,8,0.8)',
        padding: '10px 15px',
        borderRadius: '8px',
        border: '1px solid rgba(168, 85, 247, 0.3)',
        color: '#a855f7',
        fontSize: '12px',
        fontWeight: 'bold',
        zIndex: 10,
        backdropFilter: 'blur(10px)',
        textAlign: 'center'
      }}>
        Aiman.dev
      </div>
    </main>
  );
}
