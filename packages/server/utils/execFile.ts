import cp from 'child_process';

console.log(process.cwd())
cp.execFileSync('./mongodb.sh', {
  stdio: 'inherit',
  shell: true,
})
