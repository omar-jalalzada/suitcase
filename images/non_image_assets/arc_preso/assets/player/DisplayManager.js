var kStageSizeDidChangeEvent="DisplayManager:StageSizeDidChangeEvent",kTimeoutValueForCursor=1e3,kMobilePortraitModeHorizontalMargin=8,kMobilePortraitModeTopMargin=47,kMobilePortraitModeVerticalCenterLine=161,kMobilePortraitModeMaxStageHeight=228,kMobilePortraitMaxStageHeight=0,kMobilePortraitMaxStageWidth=0,kMobileLandscapeModeVerticalMargin=7,kMobileLandscapeModeHorizontallMargin=15,kBottomButtonHeight=50,kNavigationArrowSize=27,kNavigationAreaHeight=kNavigationArrowSize,kHelpAreaHeight=16,kMobilePortraitModeVerticalCenterLineToNavigationAreaGap=148,kStageToNavigationAreaGap=31,kNavigationAreaToHelpAreaGap=52,kHelpAreaToBottomGap=12,kMobilePortraitModeNavigationAreaSideMargin=32,kMobilePortraitModeHelpAreaSideMargin=16,kMobileLandscapeModeMinSideSpacerWidth=kNavigationArrowSize+10,kPadPortraitModeHorizontalMargin=8,kPadPortraitModeMaxStageHeight=540,kPadPortraitModeVerticalCenterLine=400,kPadLandscapeModeHorizontallMargin=15,kPadLandscapeModeVerticalMargin=7,DisplayManager=Class.create({initialize:function(){document.observe(kShowSizeDidChangeEvent,this.handleShowSizeDidChangeEvent.bind(this)),document.observe(kOrientationChangedEvent,this.handleOrientationDidChangeEvent.bind(this)),this.body=document.getElementById("body"),this.stageArea=document.getElementById("stageArea"),this.stage=document.getElementById("stage"),this.hyperlinkPlane=document.getElementById("hyperlinkPlane"),this.waitingIndicator=document.getElementById("waitingIndicator"),this.helpText=document.getElementById("helpText"),this.previousButton=document.getElementById("previousButton"),this.nextButton=document.getElementById("nextButton"),this.slideCounter=document.getElementById("slideCounter"),this.waitingIndicatorTimeout=null,this.orientation=kOrientationUnknown,this.showWidth=0,this.showHeight=0,this.stageAreaWidth=0,this.stageAreaHeight=0,this.stageAreaTop=0,this.stageAreaLeft=0,this.usableDisplayWidth=0,this.usableDisplayHeight=0,this.inLaunchMode=!0,this.initialAddressBarScrollPerformed=!1,this.updateUsableDisplayArea(),this.positionWaitingIndicator(),this.showWaitingIndicator(),this.hyperlinksOnly=!1,this.showStatisticsDisplay=gIpad&&getUrlParameter("statistics")==="1",this.hasCacheEverGoneOverPixelLimit=!1,this.hhasStageEverGoneOverPixelLimit=!1,this.cacheHighWaterMark=0,this.stageHighWaterMark=0,gMode===kModeMobile?(this.stageArea.style.backgroundColor="black",this.helpText.innerHTML=kTapOrSwipeToAdvance):(Event.observe(this.body,"click",function(e){gShowController.handleClickEvent(e)}),Event.observe(this.body,"mousemove",this.handleMouseMove.bind(this)),this.lastMouseX=-1,this.lastMouseY=-1,this.cursorTimeout=null,this.setTimeoutForCursor())},setHyperlinksOnlyMode:function(){this.hyperlinksOnly=!0,this.setPreviousButtonEnabled(!1),this.setNextButtonEnabled(!1),this.helpText.style.display="none"},handleMouseMove:function(e){e=e||window.event;var t=Math.abs(this.lastMouseX-e.clientX)+Math.abs(this.lastMouseY-e.clientY);t>10?this.cursorIsShowing===!1?this.showCursor():this.navigatorIsShowing||this.setTimeoutForCursor():this.navigatorIsShowing||this.setTimeoutForCursor(),this.lastMouseX=e.clientX,this.lastMouseY=e.clientY},updateSlideNumber:function(e,t){var n="",r=null;gMode!=kModeDesktop&&(n=kSlideLabel+" "+e+"/"+t,r=this.slideCounter),r!=null&&(r.innerHTML=n)},handleShowSizeDidChangeEvent:function(e){this.showWidth=e.memo.width,this.showHeight=e.memo.height,this.layoutDisplay()},handleOrientationDidChangeEvent:function(e){this.orientation=e.memo.orientation,clearTimeout(this.resizeTimer),this.resizeTimer=setTimeout(this.handleOrientationDidChangeEvent_partTwo.bind(this),300)},handleOrientationDidChangeEvent_partTwo:function(){this.layoutDisplay(),this.inLaunchMode===!1&&this.showApplicableControls()},showCursor:function(){if(this.inLaunchMode)return;this.body.style.cursor="default",this.cursorIsShowing=!0,this.setTimeoutForCursor()},hideCursor:function(){this.body.style.cursor="none",this.cursorIsShowing=!1},setTimeoutForCursor:function(){this.cursorTimeout&&clearTimeout(this.cursorTimeout),this.cursorTimeout=setTimeout(this.handleTimeoutForCursor.bind(this),kTimeoutValueForCursor)},clearTimeoutForCursor:function(){this.cursorTimeout&&clearTimeout(this.cursorTimeout)},handleTimeoutForCursor:function(){this.hideCursor()},updateUsableDisplayArea:function(){if(gMode===kModeMobile){var e=gIpad;this.orientation===kOrientationLandscape?(this.usableDisplayWidth=e?kiPadDeviceHeight:kiPhoneDeviceHeight,this.usableDisplayHeight=(e?kiPadDeviceWidth:kiPhoneDeviceWidth)-kiPhoneStatusBarHeight-kiPhoneLandscapeButtonBarHeight-(e?kiPadAddressBarHeight+kiPadBookmarksBarHeight:0)):(this.usableDisplayWidth=e?kiPadDeviceWidth:kiPhoneDeviceWidth,this.usableDisplayHeight=(e?kiPadDeviceHeight:kiPhoneDeviceHeight)-kiPhoneStatusBarHeight-kiPhonePortraitButtonBarHeight-(e?kiPadBookmarksBarHeight+10:0))}else this.usableDisplayWidth=window.innerWidth,this.usableDisplayHeight=window.innerHeight},clearLaunchMode:function(){this.inLaunchMode=!1;var e=this;runInNextEventLoop(this.showAll.bind(this))},positionWaitingIndicator:function(){var e=110,t=32,n,r;gMode===kModeMobile&&this.orientation===kOrientationUnknown?(n=1e3,r=1e3):gMode===kModeMobile&&this.orientation===kOrientationPortrait?(n=(this.usableDisplayWidth-e)/2,gIpad===!1?r=kMobilePortraitModeVerticalCenterLine-e/2:r=kPadPortraitModeVerticalCenterLine-e/2):(n=(this.usableDisplayWidth-e)/2,r=(this.usableDisplayHeight-e)/2),setElementPosition(this.waitingIndicator,r,n,e,e)},hideWaitingIndicator:function(){this.waitingIndicator.style.display="none"},showWaitingIndicator:function(){this.waitingIndicator.style.display="block"},convertDisplayCoOrdsToShowCoOrds:function(e){var t={},n=this.stageAreaLeft+this.stageAreaWidth,r=this.stageAreaTop+this.stageAreaHeight;return e.pointX<this.stageAreaLeft||e.pointX>n||e.pointY<this.stageAreaTop||e.pointY>r?(t.pointX=-1,t.pointY=-1):(t.pointX=(e.pointX-this.stageAreaLeft)/this.stageAreaWidth*this.showWidth,t.pointY=(e.pointY-this.stageAreaTop)/this.stageAreaHeight*this.showHeight),t},layoutDisplay:function(){this.updateUsableDisplayArea();var e,t;gMode===kModeDesktop?(e=this.usableDisplayWidth,t=this.usableDisplayHeight,!gShowController.isFullscreen&&(e>this.showWidth||t>t)&&(e=this.showWidth,t=t)):gIpad===!1?this.orientation===kOrientationPortrait?(e=this.usableDisplayWidth-2*kMobilePortraitModeHorizontalMargin,t=kMobilePortraitModeMaxStageHeight):(e=this.usableDisplayWidth-2*kMobileLandscapeModeHorizontallMargin,t=this.usableDisplayHeight-2*kMobileLandscapeModeVerticalMargin):this.orientation===kOrientationPortrait?(e=this.usableDisplayWidth-2*kPadPortraitModeHorizontalMargin,t=kPadPortraitModeMaxStageHeight):(e=this.usableDisplayWidth-2*kPadLandscapeModeHorizontallMargin,t=this.usableDisplayHeight-2*kPadLandscapeModeVerticalMargin);var n=scaleSizeWithinSize(this.showWidth,this.showHeight,e,t);this.stageAreaWidth=n.width,this.stageAreaHeight=n.height,this.stageAreaLeft=(this.usableDisplayWidth-this.stageAreaWidth)/2,gMode===kModeDesktop?this.stageAreaTop=(t-this.stageAreaHeight)/2:this.orientation===kOrientationPortrait?gIpad===!1?this.stageAreaTop=Math.max(10,kMobilePortraitModeVerticalCenterLine-this.stageAreaHeight/2):this.stageAreaTop=Math.max(10,kPadPortraitModeVerticalCenterLine-this.stageAreaHeight/2):this.stageAreaTop=(this.usableDisplayHeight-this.stageAreaHeight)/2,setElementPosition(this.stageArea,this.stageAreaTop,this.stageAreaLeft,this.stageAreaWidth,this.stageAreaHeight);var r=-1,i=-1,s=-1,o=-1,u=null;gMode===kModeDesktop?(u=!1,r=-1,i=-1,s=-1,o=-1):(u=!0,s=0,o=0,gIpad?i=kiPadDeviceHeight:i=kiPhoneDeviceHeight,r=i);if(s!=-1&&o!=-1&&r!=-1&&i!=-1){var a=document.getElementById("background");a.style.top=s,a.style.left=o,a.style.width=r,a.style.height=i,u===!0&&(a.style.visibility="visible")}var f={x:0,y:0,width:this.usableDisplayWidth,height:this.stageAreaTop},l={x:0,y:this.stageAreaTop+this.stageAreaHeight,width:this.usableDisplayWidth,height:this.usableDisplayHeight-this.stageAreaTop-this.stageAreaHeight},c={x:0,y:this.stageAreaTop,width:this.stageAreaLeft,height:this.stageAreaHeight},h={x:this.stageAreaLeft+this.stageAreaWidth,y:this.stageAreaTop,width:this.usableDisplayWidth-this.stageAreaWidth-c.width,height:this.stageAreaHeight},p=document.getElementById("statisticsDisplay");this.showStatisticsDisplay&&gIpad&&this.orientation===kOrientationPortrait&&(setElementPosition(p,l.y+70,0,this.usableDisplayWidth,l.height-105),p.style.visibility="visible");if(gMode!=kModeDesktop)if(this.orientation===kOrientationPortrait){var d=kNavigationArrowSize+2*kMobilePortraitModeNavigationAreaSideMargin,v=kNavigationArrowSize+2*kStageToNavigationAreaGap,m=this.usableDisplayWidth-2*d,g=l.y+7;setElementPosition(this.previousButton,g,0,d,v),setElementPosition(this.slideCounter,g+kStageToNavigationAreaGap,d,m,v),setElementPosition(this.nextButton,g,d+m-5,d,v),setElementPosition(this.helpText,l.y+l.height-kHelpAreaToBottomGap-kHelpAreaHeight,0,this.usableDisplayWidth,kHelpAreaHeight),setElementPosition(this.infoPanelIcon,this.usableDisplayHeight-kInfoPanelButtonHeight,this.usableDisplayWidth-kInfoPanelButtonWidth-5,kInfoPanelButtonWidth,kInfoPanelButtonHeight)}else{var y={x:0,y:0,width:0,height:0};c.width>kMobileLandscapeModeMinSideSpacerWidth?(setElementRect(this.previousButton,c),setElementRect(this.nextButton,h)):(setElementRect(this.previousButton,y),setElementRect(this.nextButton,y)),setElementRect(this.slideCounter,y),setElementRect(this.helpText,y),setElementRect(this.infoPanelIcon,y)}this.positionWaitingIndicator(),this.hideAddressBar(),document.fire(kStageSizeDidChangeEvent,{left:this.stageAreaLeft,top:this.stageAreaTop,width:this.stageAreaWidth,height:this.stageAreaHeight})},showApplicableControls:function(){this.inLaunchMode===!0?(hideElement(this.previousButton),hideElement(this.nextButton),hideElement(this.slideCounter),hideElement(this.helpText),hideElement(this.infoPanelIcon)):gMode===kModeDesktop?(hideElement(this.previousButton),hideElement(this.nextButton),hideElement(this.slideCounter),hideElement(this.helpText),hideElement(this.infoPanelIcon)):this.orientation===kOrientationPortrait?(showElement(this.previousButton),showElement(this.nextButton),showElement(this.slideCounter),showElement(this.helpText),showElement(this.infoPanelIcon)):(hideElement(this.slideCounter),hideElement(this.helpText),hideElement(this.infoPanelIcon),this.stageAreaLeft>kMobileLandscapeModeMinSideSpacerWidth?(showElement(this.previousButton),showElement(this.nextButton)):(hideElement(this.previousButton),hideElement(this.nextButton))),this.hideAddressBar()},showAll:function(){this.hideWaitingIndicator(),setTimeout(this.showAll_partTwo.bind(this))},showAll_partTwo:function(){gDevice===kDeviceMobile?(window.scrollTo(0,1),setTimeout(this.showAll_partThree.bind(this))):this.showAll_partThree()},showAll_partThree:function(){this.inLaunchMode===!1&&this.showApplicableControls(),showElement(this.stageArea);var e=navigator.userAgent.match(/Windows/);e&&gShowController.delegate.triggerReflow&&gShowController.delegate.triggerReflow(),showElement(this.hyperlinkPlane),gMode===kModeMobile&&showElement(this.infoPanelIcon)},setPreviousButtonEnabled:function(e){if(this.hyperlinksOnly)return;gMode!=kModeDesktop&&(e?this.previousButton.setAttribute("class","previousButtonEnabled"):this.previousButton.setAttribute("class","previousButtonDisabled"))},setNextButtonEnabled:function(e){if(this.hyperlinksOnly)return;gMode!=kModeDesktop&&(e?this.nextButton.setAttribute("class","nextButtonEnabled"):this.nextButton.setAttribute("class","nextButtonDisabled"))},hideAddressBar:function(){if(this.inLaunchMode)return;if(gDevice===kDeviceMobile){var e=this.initialAddressBarScrollPerformed?0:kHideAddressBarDelay;setTimeout("window.scrollTo(0, 1);",e),this.initialAddressBarScrollPerformed=!0}},updateStatisticsDisplay:function(){if(this.showStatisticsDisplay===!1)return;var e=document.getElementById("statisticsDisplay"),t=gShowController.textureManager.getCacheStatistics(),n=gShowController.scriptManager.degradeStatistics,r=gShowController.stageManager.debugGetStageStatistics(),i=gShowController.textureManager.numLoadFailures,s=gShowController.textureManager.numOutstandingLoadRequests,o=1048576,u=gSafeMaxPixelCount/o;u=Math.floor(u*100)/100,t.numPixels/=o,r.numPixels/=o,t.numPixels=Math.floor(t.numPixels*100)/100,r.numPixels=Math.floor(r.numPixels*100)/100;var a=!1,f=!1;t.numPixels>u&&(a=!0,this.hasCacheEverGoneOverPixelLimit=!0),r.numPixels>u&&(f=!0,this.hasStageEverGoneOverPixelLimit=!0),t.numPixels>this.cacheHighWaterMark&&(this.cacheHighWaterMark=t.numPixels),r.numPixels>this.stageHighWaterMark&&(this.stageHighWaterMark=r.numPixels);var l="<div style='position: absolute; left: 0px;'><b>Cache Statistics:</b><br>- Scenes: <b>"+t.numScenes+"</b><br>- Textures: <b>"+t.numTextures+"</b><br>- Pixels: <b>"+t.numPixels+" MP</b><br>- Peak Pixels: <b>"+this.cacheHighWaterMark+" MP</b><br>%nbsp<br><b>Limits:</b><br>- Max Pixels: <b>"+u+" MP</b><br></div><div style='position: absolute; left: 175px;'><b>Scene Statistics:</b><br>- Scene Index: <b>"+gShowController.currentSceneIndex+"</b><br>- Textures: <b>"+r.numTextures+"</b><br>- Total Pixels: <b>"+r.numPixels+" MP</b><br>- Peak Pixels: <b>"+this.stageHighWaterMark+" MP</b><br><b>Texture Loader:</b><br>- Num Load Requests: <b>"+(s>0?"<span style='color:yellow;'>"+s+"</span>":"0")+"</b><br>- Num Load Failures: <b>"+(i>0?"<span style='color:red;'>"+i+"</span>":"0")+"</b><br></div><div style='position: absolute; left: 350px;'><b>Degrade Statistics:</b><br>- Scenes w/Degrades: <b>"+n.numDegradedSlides+"</b><br>- Total Textures Degraded: <b>"+n.numDegradedTextures+"</b><br>- Max Textures/Scene: <b>"+n.maxNumDegradedTexturesPerSlide+"</b><br>- Textures in Current: <b>"+(r.numDegraded>0?"<span style='color:yellow;'>"+r.numDegraded+"</span>":"0")+"</b><br></div><div style='position: absolute; left: 550px;'><b>Summary:</b><br>- Cache: <br>- Over Pixel Limit Now: <b>"+(a?"<span style='color:red;'>YES</span>":"NO")+"</b><br>- Ever Over Pixel Limit: <b>"+(this.hasCacheEverGoneOverPixelLimit?"<span style='color:red;'>YES</span>":"NO")+"</b><br>- Stage: <br>- Over Pixel Limit Now: <b>"+(f?"<span style='color:red;'>YES</span>":"NO")+"</b><br>- Ever Over Pixel Limit: <b>"+(this.hasStageEverGoneOverPixelLimit?"<span style='color:red;'>YES</span>":"NO")+"</b><br></div>";e.innerHTML=l}});