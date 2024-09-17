export default {
  apps: [
    {
      script: 'index.ts',
      interpreter: 'node',
      interpreterArgs: '--import tsx',
      instances: 2,
      exec_mode: cluster,
    },
  ],
}
