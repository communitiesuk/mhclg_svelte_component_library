# Introduction

Plain HTML will work on any screen. Therefore, failure to display content properly on different screen sizes is generally caused by CSS.[^1]

[^1]:[Responsive columns without media queries](https://medium.com/@hayavuk/responsive-columns-without-media-queries-1dd92dc0f5e6)

# Breakpoints and media queries

> Breakpoints should be content-based, not device based - *Kaloyan Kosev*[^1]

> Start with the small screen first, then expand until it looks like s\*\*t. Time for a breakpoint! – *Stephen Hay*[^3]

You don't want everything to scale proportionally. On larger screens, images can become very large, forcing other content off the screen[^4]. 

It's common to use viewport width in media queries, but there are a large range of media features that can be detected (color, color index, aspect ratio, device aspect ratio, width, device width, height, device height, orientation, monochrome, resolution, scan, pixel-density, and more)[^3].

There are several reasons not to use device pixel dimensions as breakpoints. One is that new devices are likely to have different dimensions, making the older ones abritrary[^3].  

Sometimes a design needs to change significantly when the available space (or other parameter) renders it unsuitable. Other times, it might only be necessary to change one aspect. This is known as a minor breakpoint or a tweakpoint [^3]. 

Developers are warned that highly complex media queries pose a danger: they can be difficult to manage long-term [^3].

Older advice on the internet suggests that pixel-based media queries didn't function as expected when a user zoomed in. This issue is now outdated. However, it's still recommended to use em-based media queries because they will still function when a browser's font size isn't the default 16px [^1]

It's recommended that lines of text aren't too short or long, ideally 45-90 characters. It's possible to achieve this with different font sizes by specifying font size and element width as a proportion of viewport width, and scaling them at the same rate [^3].

Progressive enhancement is...
Min-width is better suited to progressive enhancement than max-width, because styles are overridden at smaller screens, not larger ones[^5]

[^1] [Journey to highly effective and maintainable CSS media queries](https://notes.devlabs.bg/journey-to-highly-effective-and-maintainable-css-media-queries-876e5b92f918)

[^2] [7 habits of highly effective media queries](https://bradfrost.com/blog/post/7-habits-of-highly-effective-media-queries/)

[^3] [Responsive web design](https://practicaltypography.com/responsive-web-design.html)

[^4] [Responsive web design](https://alistapart.com/article/responsive-web-design/)

[^5] [Avoiding common mistakes with CSS media queries](https://blog.pixelfreestudio.com/avoiding-common-mistakes-with-css-media-queries/)

# Units

Units are used to define the size of elements on a screen. Using appropriate units is important for ensuring designs scale properly on different screen sizes. 

rem units are defined by the font size of the root element (16px by default).
em units are defined by the font size of the parent element.

Font sizes should be set using rem units; values in pixels won't scale properly if the browser's font size changes. By default, 1rem = 16px, so 1.5rem = 24px.

Margins and padding should be set using em units. 

When defining CSS width and height values, percentages are recommended (as a proportion of the parent element).

Properties that don't need to be responsive (e.g. border-width) can be set using pixels.

From: [Why CSS units matter to your responsive website designs](https://pieces.app/blog/css-units-responsive-website-designs)

See also: [whatunit.com](https://whatunit.com/)

# Interaction

Touch targets should be large enough (Apple recomends 44x44 pixels[^1]) and should be sufficient spaced apart [^2]

[^1] [A Hands-On Guide to Mobile-First Design](https://www.uxpin.com/studio/blog/a-hands-on-guide-to-mobile-first-design/)
[^2] [Common Mobile Design Mistake on Your Website](https://conroycreativecounsel.com/avoid-these-common-mobile-design-mistakes-on-your-website/)

# Progressive Enhancement

# Common Pitfalls of Mobile-First

> Porting an unchanged UI to a different platform hurts UX. - *NN Group*[^3]

A one-size-fits-all approach might be appealing, but it's possible to focus on smaller screens *at the expense of* larger screens. Desktops are more 'robust' - they can handle more complexity.

This involves dailing to 'flesh out' a design for screens that can handle it [^1]. This is known as 'mobile everything'[^2] or 'mobile-only'[^3]. 

Consider a hamburger icon to find the links to toggle between views. On mobile, there might be insufficient space, but not so on desktop. Displaying these links permanently would reduce clicks from one to two [^2]. Futhermore, interactive elements like a hamburger icon might be easily noticed on a mobile screen, but overlooked on a large desktop screen [^3].

Other examples include hiding functionality in drawers, using icons instead of/without text, and breaking content into several screens [^2].

Research has found that navigation isn't used as frequently when it's hidden within a menu [^3].

Some argue that the importance of consistency across devices is overestimated [^1].
The context is different on different devices, so the interfaces should be adapted to suit the context [^1].
Input differs across devices too, so design should be modified accordingly. Phones are typically used in portrait mode, and thumbs will be able to respond to functionality near the bottom. Tablets are often used with both hands, so there's greater scope for where interactive elements are placed. Desktop users have more fine-grained control, due to using a mouse or trackpad. Desktop users might expect key functionality to be positioned towards the top of the screen [^1].

[^1] [Why is mobile-first design failing](https://jamesarcher.co/170/mobile-first-why-are-we-getting-it-wrong)
[^3] [Mobile-first not mobile-only](https://www.nngroup.com/articles/mobile-first-not-mobile-only/)
[^2] [Mobile first, desktop worst](https://blog.prototypr.io/mobile-first-desktop-worst-f900909ae9e2)