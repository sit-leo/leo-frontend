
function redirectToErrorWithMessage(ctx, message) {
  if (ctx.req) {
    ctx.res.writeHead(302, { Location: `/_error?message=${message}` });
    ctx.res.end();
  } else {
    window.location.replace(`/_error?message=${message}`);
  }
}

export default redirectToErrorWithMessage;
