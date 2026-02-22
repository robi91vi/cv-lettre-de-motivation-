import re
path = '/Users/macviv387/Documents/cv carole/index.html'
content = open(path, 'r').read()

tools_html = """
                // OUTILS RAPIDES
                if (!el.querySelector('.block-font-tools')) {
                    const t = document.createElement('div');
                    t.className = 'block-font-tools no-print';
                    t.style.position = 'absolute';
                    t.style.right = '0px';
                    t.style.top = '10px';
                    t.style.display = 'flex';
                    t.style.flexDirection = 'column';
                    t.style.background = 'white';
                    t.style.border = '2px solid #466EFF';
                    t.style.borderRadius = '6px';
                    t.style.overflow = 'hidden';
                    t.style.zIndex = '1000';
                    t.innerHTML = `
                        <button onmousedown="event.preventDefault(); quickResize('${id}', -1)" title="Réduire" style="width:24px;height:24px;display:flex;align-items:center;justify-content:center;font-size:12px;cursor:pointer;background:transparent;border:none;border-bottom:2px solid #466EFF;color:#142355;"><i class="fas fa-minus"></i></button>
                        <button onmousedown="event.preventDefault(); quickResize('${id}', 1)" title="Agrandir" style="width:24px;height:24px;display:flex;align-items:center;justify-content:center;font-size:12px;cursor:pointer;background:transparent;border:none;color:#142355;"><i class="fas fa-plus"></i></button>
                    `;
                    el.appendChild(t);
                }
"""
content = re.sub(r'// Suppression demandée par .*?\(block-font-tools\)', tools_html, content)

quick_resize_fn = """        function quickResize(id, dir) {
            const el = document.getElementById(id);
            if (!el) return;
            const ces = el.querySelectorAll('[contenteditable="true"]');
            if (ces.length > 0) {
                ces.forEach(ce => {
                    const currentSize = parseFloat(window.getComputedStyle(ce).fontSize) || 14;
                    ce.style.fontSize = Math.max(8, currentSize + dir) + 'px';
                });
            } else {
                const currentSize = parseFloat(window.getComputedStyle(el).fontSize) || 14;
                el.style.fontSize = Math.max(8, currentSize + dir) + 'px';
            }
            saveState();
        }

"""
content = content.replace("function ensureSettingsButtons() {", quick_resize_fn + "function ensureSettingsButtons() {")

content = content.replace("startResizeVal = parseInt(style.marginTop) || 0;", "startResizeVal = parseInt(style.paddingTop) || 0;")
content = content.replace("startResizeVal = parseInt(style.marginBottom) || 0;", "startResizeVal = parseInt(style.paddingBottom) || 0;")

content = content.replace("activeResizeEl.style.marginTop = Math.max(0, (startResizeVal - dy)) + 'px';", "activeResizeEl.style.paddingTop = Math.max(0, (startResizeVal - dy)) + 'px';")
content = content.replace("activeResizeEl.style.marginBottom = Math.max(0, (startResizeVal + dy)) + 'px';", "activeResizeEl.style.paddingBottom = Math.max(0, (startResizeVal + dy)) + 'px';")

open(path, 'w').write(content)
print("Updated successfully")
