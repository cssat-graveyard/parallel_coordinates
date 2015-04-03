
     function WinOpen()
        {
        alert('nPage will load to full screen.nnUse View/Document Source from menu bar to view source.nnClose new window to return to this page. ');
        window.open("brow_count2.html","DisplayWindow","menubar=yes");
        window.open("brow_count2.html","DisplayWindow","menubar=yes");   // double for Macs
        }

     function leapto()
        {
        window.location="brow_count2.html";
        }

     //
     // Javascript to calculate visits using cookies.
     // Copyright (c) Kenneth Norton, T3 (ken@t3.com)
     //
     // Public Domain Cookie Functions
     // Written by:  Bill Dortch, hIdaho Design (bdortch@netw.com)
     //
     
     function getCookieVal (offset)
        {
        var endstr = document.cookie.indexOf (";", offset);
        if (endstr == -1)
           endstr = document.cookie.length;
        return unescape(document.cookie.substring(offset, endstr));
        }
     
     function GetCookie (name)
        {
        var arg = name + "=";
        var alen = arg.length;
        var clen = document.cookie.length;
        var i = 0;
        while (i < clen)
           {
           var j = i + alen;
           if (document.cookie.substring(i, j) == arg)
              return getCookieVal (j);
           i = document.cookie.indexOf(" ", i) + 1;
           if (i == 0)
              break;
           }
    
        return null;
        }
     
     function SetCookie (name, value)
        {
        var argv = SetCookie.arguments;
        var argc = SetCookie.arguments.length;
        var expires = (2 < argc) ? argv[2] : null;
        var path = (3 < argc) ? argv[3] : null;
        var domain = (4 < argc) ? argv[4] : null;
        var secure = (5 < argc) ? argv[5] : false;
        document.cookie = name + "=" + escape (value) +
          ((expires == null) ? "" : ("; expires=" + expires.toGMTString())) +
          ((path == null) ? "" : ("; path=" + path)) +
          ((domain == null) ? "" : ("; domain=" + domain)) +
             ((secure == true) ? "; secure" : "");
        }
     
     // function to diplay info
     // by Timothy  (timothy@essex1.com)
     function DisplayInfo()
        {
        var expdate = new Date();
        var visit;
        // Set expiration date to 10 year from now.
        expdate.setTime(expdate.getTime() +  (24 * 60 * 60 * 1000 * 365 * 10));
        if(!(visit = GetCookie("visit_parallel")))
           visit = 0;
           visit++;  
        SetCookie("visit_parallel", visit, expdate, "/", null, false);
        if(visit){
            $(".fancybox-media").trigger('click');
        }
        }

     //  by Timothy  (timothy@essex1.com)
     function ResetCounts()
        {
        var expdate = new Date();
        expdate.setTime(expdate.getTime() +  (24 * 60 * 60 * 1000 * 365 * 10));
        visit = 0;
        SetCookie("visit_parallel", visit, expdate , "/", null, false);
        leapto();
        }
     // De-activate Cloaking -->

