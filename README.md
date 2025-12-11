# 📚 Knowledge Timeline App

Ứng dụng tổng hợp kiến thức khoa học theo thời gian.

## 🚀 Chạy app

```bash
# 1. Khởi động PostgreSQL
docker-compose up -d

# 2. Setup database
npm run db:push
npm run db:seed

# 3. Chạy development
npm run dev
```

Truy cập: **http://localhost:3000**

## 🎯 Tính năng

- ✅ Nhập kiến thức với form đầy đủ
- ✅ Timeline view theo thời gian
- ✅ Phân loại theo môn học & quốc gia
- ✅ Hỗ trợ Trước Công Nguyên (TCN)
- ✅ Filter & Search
- ✅ 4 views: Timeline, List, Grid, Calendar
