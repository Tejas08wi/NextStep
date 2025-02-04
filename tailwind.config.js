theme: {
  extend: {
    animation: {
      'float1': 'float1 8s ease-in-out infinite',
      'float2': 'float2 12s ease-in-out infinite',
      'float3': 'float3 10s ease-in-out infinite',
    },
    keyframes: {
      float1: {
        '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
        '50%': { transform: 'translate(20px, -20px) rotate(180deg)' },
      },
      float2: {
        '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
        '50%': { transform: 'translate(-20px, 20px) rotate(-180deg)' },
      },
      float3: {
        '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
        '50%': { transform: 'translate(20px, 20px) rotate(90deg)' },
      },
    },
  },
} 