using Sitecore.Shell.Framework.Commands;

namespace CMSnake.Commands
{
    public class Launch : Command
    {

        private static bool IsSnakeLaunched = false;
        public override void Execute(CommandContext context)
        {
            if (!IsSnakeLaunched)
            {
                AttachScript();
                AttachStyles();
                AttachIframe();
                IsSnakeLaunched = true;
            } else
            {
                MakeIframeVisible();
            }
        }

        public void AttachScript()
        {
            Sitecore.Web.UI.Sheer.SheerResponse.Eval(
            "var scriptTag = document.createElement('script'); scriptTag.src = '/sitecore/shell/Applications/CMSnake/Launch.js'; document.head.appendChild(scriptTag);"
);
        }

        public void AttachStyles() {
            Sitecore.Web.UI.Sheer.SheerResponse.Eval("var styleTag = document.createElement('link'); styleTag.rel = 'stylesheet'; styleTag.href = '/sitecore/shell/Applications/CMSnake/snake.css'; document.head.appendChild(styleTag);");
        }

        public void AttachIframe() {
            Sitecore.Web.UI.Sheer.SheerResponse.Eval("var iframe = document.createElement('iframe'); iframe.src = '/sitecore/shell/Applications/CMSnake/index.html'; iframe.setAttribute('id', 'gameFrame');iframe.setAttribute('class', 'game-frame'); document.body.appendChild(iframe); iframe.focus();");
        }


        public void MakeIframeVisible()
        {
            Sitecore.Web.UI.Sheer.SheerResponse.Eval("var iframe = document.getElementById('gameFrame'); iframe.style.display = 'block'; iframe.removeAttribute('hidden')");
        }
    }
}