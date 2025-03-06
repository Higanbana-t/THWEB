export const subjects = [
  {
    id: 1,
    code: "MATH101",
    name: "Toán học",
    credit: 3,
    knowledgeBlockId: 2, // Thuộc khối "Chuyên sâu"
    questions: [
      { id: 1, content: "Định lý Pythagoras?", difficulty: "Dễ" },
      { id: 2, content: "Giải phương trình bậc hai?", difficulty: "Trung bình" },
      { id: 5, content: "Chứng minh bất đẳng thức Cauchy-Schwarz?", difficulty: "Rất khó" }
    ]
  },
  {
    id: 2,
    code: "PHYS201",
    name: "Vật lý",
    credit: 4,
    knowledgeBlockId: 1, // Thuộc khối "Tổng quan"
    questions: [
      { id: 3, content: "Công thức tính vận tốc?", difficulty: "Dễ" },
      { id: 6, content: "Giải thích thuyết tương đối hẹp?", difficulty: "Rất khó" }
    ]
  },
  {
    id: 3,
    code: "HIST301",
    name: "Lịch sử",
    credit: 2,
    knowledgeBlockId: 4, // Thuộc khối "Ứng dụng thực tế"
    questions: [
      { id: 4, content: "Nguyên nhân Chiến tranh thế giới thứ hai?", difficulty: "Trung bình" },
      { id: 7, content: "Phân tích tác động của Hiệp định Versailles năm 1919?", difficulty: "Rất khó" }
    ]
  }
];
