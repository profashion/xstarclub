;(function($){

	var Carousel = function(poster){
		var self = this;
		//дїќе­еЌ•дёЄж—‹иЅ¬жњЁй©¬еЇ№и±Ў
		this.poster = poster;
		this.posterItemMain = poster.find("ul.poster-list");
		this.nextBtn = poster.find("div.poster-next-btn");
		this.prevBtn = poster.find("div.poster-prev-btn");
		this.posterItems = poster.find("li.poster-item");
		if( this.posterItems.size()%2 == 0 ){
			this.posterItemMain.append( this.posterItems.eq(0).clone() );
			this.posterItems = this.posterItemMain.children();
		};
		this.posterFirstItem = this.posterItems.first();
		this.posterLastItem = this.posterItems.last();
		this.rotateFlag = true;
		//й»и®¤й…ЌзЅ®еЏ‚ж•°
		this.setting = {
			"width" : 1000,			//е№»зЃЇз‰‡зљ„е®Ѕеє¦
			"height" : 270,			//е№»зЃЇз‰‡зљ„й«еє¦
			"posterWidth" : 640,	//е№»зЃЇз‰‡з¬¬дёЂеё§зљ„е®Ѕеє¦
			"posterHeight" : 270,	//е№»зЃЇз‰‡з¬¬дёЂеё§зљ„й«еє¦
			"scale" : 0.9,			//и®°еЅ•жѕз¤єжЇ”дѕ‹е…ізі»
			"speed" : 500,
			"autoPlay" : false,
			"delay" : 5000,
			"verticalAlign" : "middle" //top bottom
		};
		$.extend( this.setting,this.getSetting() );
		
		//и®ѕзЅ®й…ЌзЅ®еЏ‚ж•°еЂј
		this.setSettingValue();
		//е€ќе§‹еЊ–е№»зЃЇз‰‡дЅЌзЅ®
		this.setPosterPos();
		//е·¦ж—‹иЅ¬жЊ‰й’®
		this.nextBtn.click(function(){
			if(self.rotateFlag){
				self.rotateFlag = false;
				self.carouseRotate("left");
			};
		});
		//еЏіж—‹иЅ¬жЊ‰й’®
		this.prevBtn.click(function(){
			if(self.rotateFlag){
				self.rotateFlag = false;
				self.carouseRotate("right");
			};
		});
		//жЇеђ¦ејЂеђЇи‡ЄеЉЁж’­ж”ѕ
		if(this.setting.autoPlay){
			this.autoPlay();
			this.poster.hover( function(){
				//self.timerжЇsetIntervalзљ„з§Ќе­ђ
				window.clearInterval(self.timer);
			}, function(){
				self.autoPlay();
			});			
		};
	};
	Carousel.prototype = {
		autoPlay:function(){
			var self = this;
			this.timer = window.setInterval( function(){
				self.nextBtn.click();
			}, this.setting.delay );
		},

		//ж—‹иЅ¬
		carouseRotate:function(dir){
			var _this_  = this;
			var zIndexArr = [];
			//е·¦ж—‹иЅ¬
			if(dir === "left"){
				this.posterItems.each(function(){
					var self = $(this),
						prev = self.prev().get(0)?self.prev():_this_.posterLastItem,
						width = prev.width(),
						height =prev.height(),
						opacity = prev.css("opacity"),
						left = prev.css("left"),
						top = prev.css("top"),
						zIndex = prev.css("zIndex");

					zIndexArr.push(zIndex);
					self.animate({
						width :width,
						height :height,
					  //zIndex :zIndex,
					    opacity :opacity,
					    left :left,
					    top :top
					},_this_.setting.speed,function(){
						_this_.rotateFlag = true;
					});
				});
				//zIndexйњЂи¦ЃеЌ•з‹¬дїќе­е†Ќи®ѕзЅ®пјЊйІж­ўеѕЄзЋЇж—¶еЂ™и®ѕзЅ®е†ЌеЏ–зљ„ж—¶еЂ™еЂјж°ёиїњжЇжњЂеђЋдёЂдёЄзљ„zindex
				this.posterItems.each(function(i){
					$(this).css("zIndex",zIndexArr[i]);
				});
			}else if(dir === "right"){//еЏіж—‹иЅ¬
				this.posterItems .each(function(){
					var self = $(this),
						next = self.next().get(0)?self.next():_this_.posterFirstItem,
						width = next.width(),
						height =next.height(),
						opacity = next.css("opacity"),
						left = next.css("left"),
						top = next.css("top"),
						zIndex = next.css("zIndex");

					zIndexArr.push(zIndex);					
					self.animate({
						width :width,
						height :height,
					  //zIndex :zIndex,
					    opacity :opacity,
					    left :left,
					    top :top
					},_this_.setting.speed,function(){
						_this_.rotateFlag = true;
					});	
				});
				//zIndexйњЂи¦ЃеЌ•з‹¬дїќе­е†Ќи®ѕзЅ®пјЊйІж­ўеѕЄзЋЇж—¶еЂ™и®ѕзЅ®е†ЌеЏ–зљ„ж—¶еЂ™еЂјж°ёиїњжЇжњЂеђЋдёЂдёЄзљ„zindex
				this.posterItems.each(function(i){
					$(this).css("zIndex",zIndexArr[i]);
				});
			};
		},
		//и®ѕзЅ®е‰©дЅ™зљ„её§зљ„дЅЌзЅ®е…ізі»
		setPosterPos:function(){
			var self = this,
				sliceItems = this.posterItems.slice(1),
				sliceSize = sliceItems.size()/2,
				rightSlice = sliceItems.slice(0,sliceSize),
				//е­ењЁе›ѕз‰‡еҐ‡еЃ¶ж•°й—®йў
				level = Math.floor(this.posterItems.size()/2),
				leftSlice = sliceItems.slice(sliceSize);
			
			//и®ѕзЅ®еЏіиѕ№её§зљ„дЅЌзЅ®е…ізі»е’Ње®Ѕеє¦й«еє¦top
			var firstLeft = (this.setting.width - this.setting.posterWidth)/2;
			var rw = this.setting.posterWidth,
				fixOffsetLeft = firstLeft + rw,
				rh = this.setting.posterHeight,
				gap = ((this.setting.width - this.setting.posterWidth)/2)/level;
			
			//и®ѕзЅ®еЏіиѕ№дЅЌзЅ®е…ізі»
			rightSlice.each(function(i){
				level--;
				rw = rw * self.setting.scale;
				rh = rh * self.setting.scale;
				var j = i;
				$(this).css({
					zIndex :level,
					width :rw,
					height :rh,
					opacity :1/(++j),
					left :fixOffsetLeft+(++i)*gap - rw,
					top :self.setVerticalAlign(rh)
				});
			});

			//и®ѕзЅ®е·¦иѕ№зљ„дЅЌзЅ®е…ізі»
			var lw = rightSlice.last().width(),
				lh  =rightSlice.last().height(),
				oloop = Math.floor(this.posterItems.size()/2);
			leftSlice.each(function(i){
				$(this).css({
					zIndex:i,
					width:lw,
					height:lh,
					opacity:1/oloop,
					left:i*gap,
					top:self.setVerticalAlign(lh)
				});
				lw = lw/self.setting.scale;
				lh = lh/self.setting.scale;
				oloop--;
			});
		},
	
		//и®ѕзЅ®ећ‚з›ґжЋ’е€—еЇ№йЅђ
		setVerticalAlign:function(height){
			var verticalType  = this.setting.verticalAlign,
				top = 0;
			if(verticalType === "middle"){
				top = (this.setting.height-height)/2;
			}else if(verticalType === "top"){
				top = 0;
			}else if(verticalType === "bottom"){
				top = this.setting.height-height;
			}else{
				top = (this.setting.height-height)/2;
			};
			return top;
		},

		//и®ѕзЅ®й…ЌзЅ®еЏ‚ж•°еЂјеЋ»жЋ§е€¶еџєжњ¬зљ„е®Ѕеє¦й«еє¦гЂ‚гЂ‚гЂ‚
		setSettingValue:function(){
			this.poster.css({
				width:this.setting.width,
				height:this.setting.height
			});
			this.posterItemMain.css({
				width:this.setting.width,
				height:this.setting.height
			});
			//и®Ўз®—дёЉдё‹е€‡жЌўжЊ‰й’®зљ„е®Ѕеє¦
			var w = (this.setting.width-this.setting.posterWidth)/2;
			//и®ѕзЅ®е€‡жЌўжЊ‰й’®зљ„е®Ѕй«пјЊе±‚зє§е…ізі»
			this.nextBtn.css({
				width:w,
				height:this.setting.height,
				zIndex:Math.ceil(this.posterItems.size()/2)
			});
			this.prevBtn.css({
				width:w,
				height:this.setting.height,
				zIndex:Math.ceil(this.posterItems.size()/2)
			});			
			this.posterFirstItem.css({
				width:this.setting.posterWidth,
				height:this.setting.posterHeight,
				left:w,
				top:0,
				zIndex:Math.floor(this.posterItems.size()/2)
			});
		},

		//иЋ·еЏ–дєєе·Ґй…ЌзЅ®еЏ‚ж•°
		getSetting:function(){			
			var setting = this.poster.attr("data-setting");
			if(setting && setting != ""){
				return $.parseJSON(setting);
			}else{
				return {};
			};
		}	
	};

	Carousel.init = function(posters){
		var _this_ = this;
		posters.each(function(){
			console.log("halo Louis;")
			new  _this_($(this));
		});
	};

	//жЊ‚иЅЅе€°windowдё‹
	window["Carousel"] = Carousel;

})(jQuery);