# 个人JS Hook脚本分享

## 必看说明

1. 以下所有hook脚本在油猴里的运行时期皆为**document-start**。
2. 以下所有脚本除hook_debugger下的脚本以外，我在重写方法时都没有为了它们重写toString方法以防止网站js检测方法是否被重写过。
3. 以下所有本人所写的脚本中如果包含`console.log(new Error().stack);`这句代码，全都可以改写为`debugger`，以方便使用时查看堆栈。
4. 当hook后依然不能实现功能，请自查油猴或其他插件加载的脚本是不是做了同样的操作，例如重写Function等等，个人建议使用时除不是自己写的脚本(指没有做要用的脚本同样动作的)都关闭。

## 脚本描述及注意事项

- <a href="https://github.com/0xsdeo/Hook_JS/blob/main/Hook_cookie/Hook_cookie%20v0.1.js">Hook_cookie/Hook_cookie v0.1.js</a>

脚本描述：当js设置cookie时就会打印其堆栈信息和设置的cookie。

注意事项：**当使用该脚本hook站点时，如果网站js尝试设置cookie就不会成功**，所以需要注意的是某些站点可能会校验cookie，但是js又不能成功设置cookie，就导致站点一直重定向反复设置cookie，此时就可以考虑使用`Hook_cookie v0.2`。

效果：
![1734622574805](image/README/1734622574805.png)
![1734622632017](image/README/1734622632017.png)
直接定位到设置cookie的位置。

详见：<a href="https://mp.weixin.qq.com/s/28q2Hd0ZLRyBRyRT_8JE0g">JS逆向系列12-深入Js Hook</a>

- <a href="https://github.com/0xsdeo/Hook_JS/blob/main/Hook_cookie/Hook_cookie%20v0.2.js">Hook_cookie/Hook_cookie v0.2.js</a>

脚本描述：当js设置cookie时就会打印其堆栈信息和设置的cookie。

注意事项：**当使用该脚本hook站点时，网站js可以成功设置cookie，不会再有v0.1脚本设置失败的情况**，例如：
![1734621378983](image/README/1734621378983.png)
![1734621404657](image/README/1734621404657.png)

效果同v0.1脚本。

- <a href="https://github.com/0xsdeo/Hook_JS/blob/main/hook_console/hook_clear.js">hook_console/hook_clear.js</a>

脚本描述：重写`console.clear`方法，以此来禁止js清除控制台数据。

详见：<a href="https://mp.weixin.qq.com/s/r-ZcP2knpmoVEK0y_26xBw">JS逆向系列10-反调试与反反调试</a>

- <a href="https://github.com/0xsdeo/Hook_JS/blob/main/hook_console/hook_log%20v0.1.js">hook_console/hook_log v0.1.js</a>

脚本描述：通过冻结console对象来禁止js重写log方法。

注意事项：该脚本主要针对网站重写console.log方法时处在`非严格模式`下，因为如果网站js是在严格模式下重写的console.log方法，并且在冻结console对象的前提下就会导致报错，例如：
![1734449923005](image/README/1734449923005.png)
![1734449896793](image/README/1734449896793.png)
但是如果是非严格模式下就不会报错，例如以下案例：
![1734450338168](image/README/1734450338168.png)
如果是上文那种处于严格模式下重写的log方法，此时就可以考虑使用`hook_log v0.2脚本`。

详见：<a href="https://mp.weixin.qq.com/s/l6_m3x3TbKDma_eexxx-Zw">JS逆向系列13-反调试之console.log</a>

- <a href="https://github.com/0xsdeo/Hook_JS/blob/main/hook_console/hook_log%20v0.2.js">hook_console/hook_log v0.2.js</a>

脚本描述：通过toString方法判断console.log方法是否被重写，以此来防止js重写log方法。

注意事项：

1. 当使用该脚本hook时，刷新或进入网站时尽量不要开着F12，最好是等几秒再打开F12，这样做主要是为了防止漏掉一些原本js log的内容(当然开着F12也是可以的)。
2. 该脚本主要是为了防止hook_log v0.1注意事项中提到的那种情况，例如我就拿v0.2脚本hook那个报异常的案例：
![1734455566322](image/README/1734455566322.png)
成功打印出内容并没有报错。
3. 脚本定义了一个waiting_time，这个变量主要是为了防止页面一直没加载完毕从而导致脚本的window.onload一直不会生效，这可能是由于页面的一些资源卡住等问题造成的，所以此时可以通过设置waiting_time等待时间，也就是等待页面加载地差不多的时候就进行判断js是否重写了log方法，**默认为3秒**。
4. 极端情况：如果网站js是处于严格模式下重写console.log方法，并且随后还冻结了console对象，那么我这个脚本做的操作就无济于事了，而且这个脚本还是处于严格模式下，所以可能还会报错，此时就可以考虑将代码的前几行，也就是被注释掉的部分打开：
![1734451237466](image/README/1734451237466.png)
在这段代码中我将`Object.freeze`重写了，我之所以注释掉是怕网站用这个方法做了什么操作，怕引起不必要的报错，如果遇到了上面的情况，就可以考虑打开这段代码。

我画了一张图供各位参考：
![1734537568779](image/README/1734537568779.png)

**注：这两个脚本一定不要混用！！！**

- <a href="https://github.com/0xsdeo/Hook_JS/blob/main/hook_window/hook_close.js">hook_window/hook_close.js</a>

脚本描述：重写close方法，以此来避免网站反调试关闭当前页面。

详见：<a href="https://mp.weixin.qq.com/s/r-ZcP2knpmoVEK0y_26xBw">JS逆向系列10-反调试与反反调试</a>

- <a href="https://github.com/0xsdeo/Hook_JS/blob/main/hook_window/hook_history.js">hook_window/hook_history.js</a>

脚本描述：重写go和back方法，以此来避免网站反调试返回上一页或某个特定历史页面。

详见：<a href="https://mp.weixin.qq.com/s/r-ZcP2knpmoVEK0y_26xBw">JS逆向系列10-反调试与反反调试</a>

- <a href="https://github.com/0xsdeo/Hook_JS/blob/main/hook_JSON.js">hook_JSON.js</a>

脚本描述：重写parse和stringify方法，以此来获取调用这个方法所传入的内容以及堆栈信息。

效果：
![1734623125248](image/README/1734623125248.png)
![1734534955744](image/README/1734534955744.png)

- <a href="https://github.com/0xsdeo/Hook_JS/blob/main/Hook_xhr.js">Hook_xhr.js</a>

脚本描述：当设置了请求头时就会打印堆栈信息和设置的请求头内容；当发送了请求就会打印堆栈信息和请求信息。

效果：
![1734626741352](image/README/1734626741352.png)

注意事项：当打印的request内容为`[object Blob]`时，则表示请求内容为二进制流，例如：
![1734623360246](image/README/1734623360246.png)
![1734623312217](image/README/1734623312217.png)

- <a href="https://github.com/0xsdeo/Hook_JS/tree/main/hook_debugger/Bypass_Debugger">hook_debugger/Bypass_Debugger</a>

该目录下的脚本可bypass：

new Function --> debugger

constructor --> debugger

eval --> debugger

也就是说大部分存在无限debugger的站点皆可bypass掉。

我又另开了一个仓库专门放这些脚本，详见：`https://github.com/0xsdeo/Bypass_Debugger`

注意事项：

1. 如果发现hook后打开F12依然存在debugger：

- **建议开着F12在刷新一次。** 
- 请检查油猴或其他插件加载的脚本是不是做了同样的操作，例如重写Function等等，个人建议使用时除不是自己写的脚本(指没有做本脚本同样动作的)都关闭。

2. 我的这段Bypass Debugger脚本，目前已知的只有以下这两种情况不能被bypass掉：
```js
var dbg = function (){
    debugger;
}
setInterval(dbg,3000);
```
![1734621889014](image/README/1734621889014.png)

以及直接将debugger写在script当中的：

![1734621892956](image/README/1734621892956.png)

以上这两种设条件断点就能过(如果不知道怎么设置条件断点的可以去看一下我之前写的的反调试与反反调试一文)，或者替换也行，不需要hook的，所以我就暂时没去管这个。

3. 如果发现hook后站点js出现异常，可以考虑使用备用脚本，也就是`Bypass_Debugger(备用).js`。

- <a href="https://github.com/0xsdeo/Hook_JS/blob/main/hook_debugger/Hook_Function/Hook_Function.js">hook_debugger/Hook_Function/Hook_Function.js</a>

该脚本可bypass：

new Function --> debugger

constructor --> debugger

- <a href="https://github.com/0xsdeo/Hook_JS/tree/main/hook_debugger/Hook_eval">hook_debugger/Hook_eval</a>

该目录下的脚本可bypass：

eval --> debugger

注意事项：如果发现hook后站点js出现异常，可以考虑使用备用脚本，也就是`Hook_eval(备用).js`。

注：这三个bypass debugger脚本我个人建议只使用`Bypass_Debugger`，极其不建议混用Hook_Function和Hook_eval这两个脚本，因为另外两个Hook_Function和Hook_eval这两个脚本的toString方法我是各自只针对它俩的，比如我在Hook_Function脚本里重写的toString方法就只写了Function：
![1734623703685](image/README/1734623703685.png)
Hook_eval亦是如此，所以要是两个一块用的话可能会出一些问题，有经验的师傅应该已经猜出来了，因为我这里直接重写的是Function原型上的toString方法，两个一块用的话后执行的就必定会覆盖掉先执行的，所以我这里建议只使用Bypass_Debugger这个脚本。

## Contact

如有bug或其他问题可提交issues，或者关注公众号Spade sec联系我。

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=0xsdeo/Hook_JS&type=Date)](https://star-history.com/#0xsdeo/Hook_JS&Date)