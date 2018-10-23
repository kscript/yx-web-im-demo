const Koa = require('koa');
const path = require('path');
const fs = require('fs.promised');
const serve = require('koa-static');
const router = require('koa-route');
const bodyParser = require('koa-bodyparser')
const app = new Koa();
const port = 12301;

app.use(bodyParser());
app.use(serve(
  path.join( __dirname + '/im/')
));

app.use(router.get("/main", async (ctx,next) => {
  ctx.response.type = 'html';
  ctx.response.body = await fs.readFile(path.join( __dirname, 'im/main.html'), 'utf8');
}));

app.use(router.get("/login", async (ctx,next) => {
  ctx.response.type = 'html';
  ctx.response.body = await fs.readFile(path.join( __dirname, 'im/login.html'), 'utf8');
}));

app.use(router.get("/kick", async (ctx,next) => {
  ctx.response.type = 'html';
  ctx.response.body = await fs.readFile(path.join( __dirname, 'im/kick.html'), 'utf8');
}));

const mainPage = async (ctx,next) => {
  ctx.response.redirect('/main');
};
app.use(router.get('', mainPage));
app.use(router.get('/', mainPage));

app.listen(port);
console.log("http://localhost:" + port);