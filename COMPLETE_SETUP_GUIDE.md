# 🚀 RAG Pipeline - Complete Setup Guide

## Beautiful React + Material-UI Frontend + Kaggle Backend

A production-ready RAG (Retrieval-Augmented Generation) pipeline with a stunning Material-UI interface and Kaggle-hosted backend.

---

## 📦 What You Get

### **Frontend**
- 🎨 Beautiful gradient purple design with glassmorphism
- 📱 Fully responsive (mobile, tablet, desktop)
- ⚡ Smooth animations with Framer Motion
- 🎯 Material-UI components
- 🌐 Modern React with hooks

### **Backend**
- 🔬 Kaggle Jupyter Notebook
- 🌍 Ngrok tunnel for public access
- 🤖 FastAPI REST API
- 📊 Complete RAG pipeline

---

## 🏗️ Architecture

```
┌─────────────────────────────────────┐
│   React Frontend (localhost:3000)   │
│   - Material-UI Design              │
│   - Framer Motion Animations        │
│   - Responsive Layout               │
└──────────────┬──────────────────────┘
               │
               ↓ HTTP Requests
               │
┌──────────────┴──────────────────────┐
│   Ngrok Tunnel (Public URL)         │
│   https://abc123.ngrok.io           │
└──────────────┬──────────────────────┘
               │
               ↓
               │
┌──────────────┴──────────────────────┐
│   Kaggle Notebook (Backend)         │
│   - FastAPI Server                  │
│   - Your RAG Code                   │
│   - PDF Processing                  │
│   - Chunk Generation                │
└─────────────────────────────────────┘
```

---

## 🚀 Quick Start (5 Steps)

### Step 1: Setup Kaggle Backend (10 minutes)

1. **Get Ngrok Token**
   - Go to https://dashboard.ngrok.com/signup
   - Sign up (free)
   - Copy your auth token from: https://dashboard.ngrok.com/get-started/your-authtoken

2. **Create Kaggle Notebook**
   - Go to https://www.kaggle.com/code
   - Click "New Notebook"
   - Enable **Internet** in settings (right sidebar)
   - Optional: Enable **GPU T4 x2** for faster processing

3. **Upload Notebook**
   - Upload `rag-backend.ipynb` to Kaggle
   - Or copy cells manually

4. **Add Your RAG Code**
   - In **Cell 4**, paste your existing RAG functions:
     - Chunking methods
     - `evaluate_chunk_quality`
     - `OptimizedRAG` class

5. **Configure and Run**
   - In **Cell 2**, paste your ngrok token
   - Run all cells in order
   - Copy the public URL from Cell 6 output

**Example output:**
```
========================================
🚀 RAG PIPELINE API IS LIVE!
========================================
📡 Public URL: https://f3a2-34-125.ngrok.io
📝 Docs: https://f3a2-34-125.ngrok.io/docs
========================================
```

### Step 2: Setup React Frontend (5 minutes)

1. **Install Dependencies**
```bash
cd react-frontend
npm install
```

2. **Update API URL**

Open `src/services/apiService.js` and update:

```javascript
// Replace this:
const API_BASE_URL = 'http://localhost:8000';

// With your ngrok URL from Kaggle:
const API_BASE_URL = 'https://f3a2-34-125.ngrok.io';
```

3. **Start Frontend**
```bash
npm run dev
```

Frontend will open at: http://localhost:3000

### Step 3: Use the Application! 🎉

1. Upload a PDF document
2. Enter a search query
3. Configure chunking settings
4. Click "Execute Pipeline"
5. View beautiful results!

---

## 📁 Project Structure

```
rag-pipeline/
│
├── rag-backend.ipynb              # Kaggle notebook
│
└── react-frontend/
    ├── package.json               # Dependencies
    ├── vite.config.js            # Build config
    ├── index.html                # HTML template
    │
    └── src/
        ├── main.jsx              # Entry point
        ├── App.jsx               # Main app component
        │
        ├── services/
        │   └── apiService.js     # API client
        │
        └── components/
            ├── MetricsCard.jsx   # Metric display cards
            ├── QualityRadar.jsx  # Quality visualization
            └── ChunkViewer.jsx   # Chunk display
```

---

## 🎨 Frontend Features

### Design System
- **Colors**: Purple gradient (#667eea → #764ba2)
- **Typography**: Outfit (display) + JetBrains Mono (code)
- **Effects**: Glassmorphism, smooth animations, hover states
- **Layout**: Responsive grid with sidebar

### Components

#### 1. Configuration Sidebar
- PDF upload with drag-drop
- Chunking method selector
- Parameter sliders (chunk size, overlap)
- Retrieval engine toggles
- Execute button

#### 2. Main Dashboard
- Search bar
- Status indicator
- Tab navigation (Metrics / Chunks)
- Results display

#### 3. Metrics Cards
- Total chunks
- Quality score
- Latency
- Coherence
- Animated on hover

#### 4. Quality Radar
- Visual quality metrics
- Progress bars
- Overall score display

#### 5. Chunk Viewer
- All document chunks
- Retrieved chunks highlighted
- Smooth scroll
- Syntax highlighting

---

## ⚙️ Configuration Options

### Chunking Methods
- **Fixed Window**: Simple fixed-size chunks
- **Adaptive Semantic**: Dynamic overlap based on similarity
- **Improved Sentence**: Sentence-aware chunking
- **Gradient**: Gradient-based semantic chunking
- **Gradient Final**: Optimized gradient method

### Retrieval Engines
- **BM25**: Keyword-based retrieval
- **Cosine**: Vector similarity
- **FAISS**: Fast approximate search
- **Reranking**: Neural reranking

### Parameters
- **Chunk Size**: 100-2000 tokens
- **Overlap**: 0-500 tokens
- **Top K**: Number of results (default: 4)

---

## 🔧 Customization

### Change Colors

Edit `src/App.jsx`:
```javascript
// Current gradient: Purple
background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'

// Change to blue:
background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'

// Change to orange:
background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
```

### Change Fonts

Edit `index.html`:
```html
<!-- Current: Outfit + JetBrains Mono -->
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">

<!-- Change to Poppins + Fira Code: -->
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&family=Fira+Code:wght@400;500;600&display=swap" rel="stylesheet">
```

Then update `src/main.jsx`:
```javascript
fontFamily: 'Poppins, sans-serif',
```

### Add New Metrics

Edit `src/App.jsx` in the metrics grid:
```javascript
<Grid item xs={12} sm={6} md={3}>
  <MetricsCard
    title="Your Metric"
    value={result.metrics.your_value}
    icon={<YourIcon />}
    color="#your-color"
  />
</Grid>
```

---

## 🐛 Troubleshooting

### Frontend Issues

**Problem: Cannot connect to backend**
```
✅ Solution:
1. Check ngrok URL is correct in apiService.js
2. Ensure Kaggle notebook is running
3. Verify Internet is enabled in Kaggle
```

**Problem: CORS errors**
```
✅ Solution:
CORS is already configured in backend.
Make sure you're using the ngrok URL, not localhost.
```

**Problem: npm install fails**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

### Backend Issues

**Problem: Ngrok authentication failed**
```
✅ Solution:
Check your token in Cell 2 of the notebook.
Get a new token from: https://dashboard.ngrok.com/get-started/your-authtoken
```

**Problem: Out of memory**
```python
# In Cell 5, reduce limits:
rag_config = {
    "chunk_limit": 500,  # Lower from 1000
    "top_k": 3,          # Lower from 4
}
```

**Problem: Models won't download**
```
✅ Solution:
1. Ensure Internet is ON in Kaggle settings
2. Wait for first request (models download on first use)
3. Check Kaggle hasn't blocked the model source
```

---

## 📊 Performance Tips

### For Speed
1. Disable FAISS if not needed
2. Use smaller embedding models
3. Reduce chunk_limit
4. Disable reranking

### For Quality
1. Enable all retrieval engines
2. Enable reranking
3. Use Gradient Final chunking
4. Increase overlap

### For Memory
1. Reduce chunk size
2. Lower chunk_limit
3. Disable unused engines

---

## 🌐 Deployment

### Frontend (Vercel - Free)

1. Push code to GitHub
2. Go to https://vercel.com
3. Import repository
4. Add environment variable:
   ```
   VITE_API_URL=your-ngrok-url
   ```
5. Deploy!

### Backend (Keep on Kaggle)

Kaggle sessions last:
- 9 hours (CPU)
- 12 hours (GPU)

For 24/7 uptime:
- Use a paid ngrok plan for permanent URL
- Deploy to a cloud service (AWS, GCP, etc.)

---

## 📚 Tech Stack

### Frontend
- **React 18**: UI library
- **Material-UI v5**: Component library
- **Framer Motion**: Animations
- **Axios**: HTTP client
- **Vite**: Build tool

### Backend
- **FastAPI**: Web framework
- **PyPDF2**: PDF processing
- **Sentence Transformers**: Embeddings
- **Transformers**: LLM
- **Ngrok**: Tunneling

---

## 🎯 Example Queries

### For ML Documents
```
"What is k-means clustering?"
"Explain gradient descent"
"How does backpropagation work?"
```

### For General Documents
```
"Summarize the main points"
"What are the key findings?"
"List the recommendations"
```

### For Technical Docs
```
"How do I configure the API?"
"What are the installation steps?"
"Explain the architecture"
```

---

## 📸 Screenshots

The UI features:
- 🎨 Purple gradient sidebar
- 📊 Animated metric cards
- 📈 Quality visualization
- 💬 Clean chunk display
- ⚡ Smooth transitions
- 📱 Mobile responsive

---

## ✅ Checklist

### Before Starting
- [ ] Ngrok account created
- [ ] Kaggle account created
- [ ] Node.js installed (v16+)
- [ ] Your RAG code ready

### Backend Setup
- [ ] Notebook created in Kaggle
- [ ] Internet enabled
- [ ] Ngrok token added
- [ ] RAG code pasted in Cell 4
- [ ] All cells run successfully
- [ ] Public URL obtained

### Frontend Setup
- [ ] Dependencies installed
- [ ] API URL updated
- [ ] Dev server running
- [ ] Can access localhost:3000

### Testing
- [ ] PDF upload works
- [ ] Query input works
- [ ] Configuration changes work
- [ ] Pipeline executes
- [ ] Results display correctly

---

## 🆘 Support

If you encounter issues:

1. **Check Kaggle Output**: Look for error messages in Cell 6
2. **Check Browser Console**: Press F12 and look for errors
3. **Test API Directly**: Visit `your-ngrok-url/docs` in browser
4. **Verify Connection**: Make sure both frontend and backend are running

---

## 🎉 You're Ready!

You now have a **beautiful, production-ready RAG pipeline** with:
- ✅ Stunning Material-UI interface
- ✅ Smooth animations
- ✅ Cloud-hosted backend
- ✅ Real-time metrics
- ✅ Mobile responsive

**Happy analyzing!** 🚀
