var kOrientationChangedEvent="OrientationController:OrientationChangedEvent",OrientationController=Class.create({initialize:function(){gDevice==kDeviceMobile&&(Event.observe(window,"orientationchange",this.handleDeviceOrientationChangeEvent.bind(this)),this.handleDeviceOrientationChangeEvent()),this.orientation=kOrientationUnknown},handleDeviceOrientationChangeEvent:function(e){var t=window.orientation,n=kOrientationUnknown;t===0||t===180?n=kOrientationPortrait:n=kOrientationLandscape,this.changeOrientation(n)},changeOrientation:function(e){this.orientation=e,document.fire(kOrientationChangedEvent,{orientation:this.orientation})}});