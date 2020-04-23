import aiohttp
import asyncio
import uvicorn
from fastai import *
from fastai.vision import *
from io import BytesIO
from starlette.applications import Starlette
from starlette.middleware.cors import CORSMiddleware
from starlette.responses import HTMLResponse, JSONResponse
from starlette.staticfiles import StaticFiles
from starlette.templating import Jinja2Templates
import mapgraphdata


export_file_url = 'https://drive.google.com/uc?export=download&id=1fYtwrNO6AtksAzpqHo7oNpx3yJ_KEZkR'
export_file_name = 'only-fruits-classifier.pkl'

classes=['acerolas', 'apples', 'apricots', 'avocados', 'bananas', 'blackberries', 'blueberries', 'cantaloupes', 'cherries', 'coconuts', 'figs', 'grapefruits', 'grapes', 'guava', 'kiwifruit', 'lemons', 'limes', 'mangos', 'olives', 'oranges', 'passionfruit', 'peaches', 'pears', 'pineapples', 'plums', 'pomegranates', 'raspberries', 'strawberries', 'tomatoes', 'watermelons']
path = Path("__file__").parent

templates = Jinja2Templates(directory='')

app = Starlette()
app.add_middleware(CORSMiddleware, allow_origins=['*'], allow_headers=['X-Requested-With', 'Content-Type'])
app.mount('/static', StaticFiles(directory='app/static'))

async def download_file(url, dest):
    if dest.exists(): return
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as response:
            data = await response.read()
            with open(dest, 'wb') as f:
                f.write(data)

async def setup_learner():
    await download_file(export_file_url, path / export_file_name)
    try:
        learn = load_learner(path, export_file_name)
        return learn
    except RuntimeError as e:
        if len(e.args) > 0 and 'CPU-only machine' in e.args[0]:
            print(e)
            message = "\n\nThis model was trained with an old version of fastai and will not work in a CPU environment.\n\nPlease update the fastai library in your training environment and export your model again.\n\nSee instructions for 'Returning to work' at https://course.fast.ai."
            raise RuntimeError(message)
        else:
            raise

# learn = load_learner("./",export_file_name)
loop = asyncio.get_event_loop()
tasks = [asyncio.ensure_future(setup_learner())]
learn = loop.run_until_complete(asyncio.gather(*tasks))[0]
loop.close()

@app.route('/')
async def homepage(request):
    # template = path / 'view' / 'index.html'
    # context = {"request": request}
    # return templates.TemplateResponse(template, context)
    html_file = path / 'app/view' / 'index.html'
    return HTMLResponse(html_file.open().read())


@app.route('/analyze', methods=['POST'])
async def analyze(request):
    img_data = await request.form()
    img_bytes = await (img_data['file'].read())
    img = open_image(BytesIO(img_bytes))
    prediction = learn.predict(img)[0]
    return JSONResponse({'result': str(prediction) })

@app.route('/keywords')
async def homepage(request):
    # template = path / 'app/view' / 'keywords.html'
    # context = {"request": request}
    # return templates.TemplateResponse(template, context)
    html_file = path / 'app/view' / 'keywords.html'
    return HTMLResponse(html_file.open().read())

@app.route('/graph_nodes')
async def graph_nodes(request):
    param=dict(request.query_params)
    return JSONResponse(mapgraphdata.graph_ideas(param['keyword']))

@app.route('/map_data')
async def map_data(request):
    param=dict(request.query_params)
    return JSONResponse(mapgraphdata.map_data(param['keyword']))

@app.route('/cluster')
async def cluster_data(request):
    param=dict(request.query_params)
    return JSONResponse(mapgraphdata.cluster_data(param['keyword']))

if __name__ == '__main__':
    if 'serve' in sys.argv:
        uvicorn.run(app=app, host='0.0.0.0', port=5000, log_level="info")
