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

        }

    }
}