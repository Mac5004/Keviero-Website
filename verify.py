from html.parser import HTMLParser
from pathlib import Path
class Check(HTMLParser):
 def __init__(self):
  super().__init__(); self.ids=set(); self.links=[]; self.assets=[]; self.h1=0
 def handle_starttag(self,t,a):
  d=dict(a)
  if 'id' in d: self.ids.add(d['id'])
  if t=='a': self.links.append(d.get('href',''))
  if t in ['img','link']: self.assets.append(d.get('src',d.get('href','')))
  if t=='h1': self.h1+=1
p=Path(__file__).resolve().parent; c=Check(); c.feed((p/'index.html').read_text(encoding='utf-8-sig'))
assert c.h1==1
assert all(x=='#' or x[1:] in c.ids for x in c.links if x.startswith('#'))
assert all((p/x).is_file() for x in c.assets if not x.startswith(('https:','http:')))
assert any(x=='mailto:support@keviero.com' for x in c.links)
print('PASS: section links, asset paths, primary heading, and contact address')
