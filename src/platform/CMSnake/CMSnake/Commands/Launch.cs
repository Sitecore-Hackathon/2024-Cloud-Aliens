using Sitecore.Shell.Framework.Commands;

namespace CMSnake.Commands
{
    public class Launch : Command
    {
        public override void Execute(CommandContext context)
        {   
            Sitecore.Web.UI.Sheer.SheerResponse.Eval(
"var scriptTag = document.createElement('script'); scriptTag.src = '/sitecore/shell/Applications/CMSnake/Launch.js'; document.head.appendChild(scriptTag);"
);
            // create an iframe and append that as well
            Sitecore.Web.UI.Sheer.SheerResponse.Eval("var iframe = document.createElement('iframe'); iframe.src = '/sitecore/shell/Applications/CMSnake/index.html'; iframe.setAttribute('id', 'gameFrame'); iframe.style.position = 'absolute'; iframe.style.zIndex = 999; iframe.style.top = '0'; iframe.style.width = '700px'; iframe.style.height = '700px'; iframe.style.margin = '25% 25%'; document.body.appendChild(iframe);");

        }

    }
}