
function redirectToLogin(ctx) {
  if (ctx.req) {
    ctx.res.writeHead(302, { Location: '/login' });
    ctx.res.end();
  } else {
    window.location.replace('/login');
  }
}

export default redirectToLogin;
