import ACCESS_ENUM from "@/access/accessEnum";
import { useLoginUserStore } from "@/store/userStore";
import checkAccess from "@/access/checkAccess";
import router from "@/router";

//进入页面前,进行权限校验
router.beforeEach(async (to, from, next) => {
  // 获取当前登陆用户信息
  const loginUserStore = useLoginUserStore();
  let loginUser = loginUserStore.loginUser;
  console.log("登陆用户信息", loginUser);

  // 如果之前没登陆过(获取登录信息过)，尝试获取用户登录信息
  if (!loginUser || !loginUser.userRole) {
    // 加 await 是为了等用户登录成功之后，再执行后续的代码
    await loginUserStore.fetchLoginUser();
    loginUser = loginUserStore.loginUser;
  }

  //当前页面需要的权限
  const needAccess = (to.meta?.access as string) ?? ACCESS_ENUM.NOT_LOGIN;
  // 要跳转的页面必须要登陆
  if (needAccess !== ACCESS_ENUM.NOT_LOGIN) {
    // 如果没登陆，跳转到登录页面
    if (
      !loginUser ||
      !loginUser.userRole ||
      loginUser.userRole === ACCESS_ENUM.NOT_LOGIN
    ) {
      next(`/user/login?redirect=${to.fullPath}`);
      return;
    }
    // 如果已经登陆了，但是权限不足，那么跳转到无权限页面
    if (!checkAccess(loginUser, needAccess)) {
      next("/noAuth");
      return;
    }
  }
  next();
});
