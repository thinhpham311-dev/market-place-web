export type FooterPage = {
  title: string;
  description: string;
  updatedAt?: string;
  sections: {
    title: string;
    items: string[];
  }[];
};

export const supportPages: Record<string, FooterPage> = {
  "help-center": {
    title: "Trung tâm hỗ trợ",
    description:
      "Tìm câu trả lời nhanh cho các vấn đề thường gặp khi mua sắm, thanh toán, giao hàng và đổi trả trên Mini Market.",
    sections: [
      {
        title: "Chủ đề thường gặp",
        items: [
          "Theo dõi trạng thái đơn hàng trong mục đơn mua hoặc qua email xác nhận.",
          "Liên hệ bộ phận hỗ trợ khi đơn hàng quá thời gian giao dự kiến.",
          "Gửi yêu cầu đổi trả trong thời hạn chính sách nếu sản phẩm lỗi, sai mô tả hoặc giao thiếu.",
        ],
      },
      {
        title: "Kênh liên hệ",
        items: [
          "Hotline: 1900 1234, hỗ trợ hằng ngày từ 08:00 đến 22:00.",
          "Email: support@marketplace.vn, phản hồi thông thường trong 24 giờ làm việc.",
          "Khi gửi yêu cầu, vui lòng cung cấp mã đơn hàng, hình ảnh liên quan và mô tả ngắn gọn vấn đề.",
        ],
      },
    ],
  },
  faq: {
    title: "Câu hỏi thường gặp",
    description: "Các câu hỏi phổ biến giúp bạn sử dụng Mini Market thuận tiện hơn.",
    sections: [
      {
        title: "Tài khoản và đơn hàng",
        items: [
          "Bạn có thể mua hàng sau khi đăng nhập hoặc tạo tài khoản mới bằng email/số điện thoại.",
          "Đơn hàng đã đặt chỉ có thể hủy khi người bán chưa xác nhận hoặc chưa bàn giao cho đơn vị vận chuyển.",
          "Thông tin giao hàng cần được kiểm tra kỹ trước khi thanh toán để hạn chế phát sinh chỉnh sửa.",
        ],
      },
      {
        title: "Thanh toán và hoàn tiền",
        items: [
          "Mini Market hỗ trợ COD và các phương thức thanh toán trực tuyến được hiển thị tại trang thanh toán.",
          "Hoàn tiền được xử lý về phương thức thanh toán ban đầu hoặc ví/tài khoản phù hợp theo từng trường hợp.",
          "Thời gian hoàn tiền có thể khác nhau tùy ngân hàng, ví điện tử hoặc đối tác thanh toán.",
        ],
      },
    ],
  },
};

export const guidePages: Record<string, FooterPage> = {
  order: {
    title: "Hướng dẫn đặt hàng",
    description: "Các bước cơ bản để tìm sản phẩm, đặt mua và theo dõi đơn hàng.",
    sections: [
      {
        title: "Quy trình đặt hàng",
        items: [
          "Tìm sản phẩm bằng thanh tìm kiếm, danh mục hoặc trang gợi ý.",
          "Kiểm tra mô tả, phân loại, giá, phí vận chuyển và đánh giá trước khi thêm vào giỏ.",
          "Xác nhận địa chỉ, phương thức thanh toán, mã giảm giá và hoàn tất đặt hàng.",
        ],
      },
      {
        title: "Sau khi đặt hàng",
        items: [
          "Theo dõi trạng thái xử lý, đóng gói, vận chuyển và giao thành công trong tài khoản.",
          "Trao đổi với người bán hoặc bộ phận hỗ trợ nếu cần cập nhật thông tin đơn.",
          "Kiểm tra sản phẩm khi nhận hàng và lưu lại bằng chứng nếu phát sinh khiếu nại.",
        ],
      },
    ],
  },
  payment: {
    title: "Phương thức thanh toán",
    description: "Thông tin về các hình thức thanh toán và nguyên tắc an toàn giao dịch.",
    sections: [
      {
        title: "Hình thức hỗ trợ",
        items: [
          "Thanh toán khi nhận hàng đối với sản phẩm và khu vực đủ điều kiện.",
          "Thanh toán qua thẻ, ví điện tử hoặc cổng thanh toán được hiển thị tại trang checkout.",
          "Một số mã giảm giá hoặc chương trình có thể giới hạn phương thức thanh toán áp dụng.",
        ],
      },
      {
        title: "An toàn thanh toán",
        items: [
          "Không chuyển khoản ngoài nền tảng nếu giao dịch yêu cầu được bảo vệ bởi Mini Market.",
          "Không chia sẻ mã OTP, mật khẩu hoặc thông tin thẻ cho người bán hay bên thứ ba.",
          "Liên hệ hỗ trợ ngay khi phát hiện giao dịch bất thường hoặc nghi ngờ gian lận.",
        ],
      },
    ],
  },
  shipping: {
    title: "Giao hàng & vận chuyển",
    description: "Chính sách xử lý, vận chuyển và nhận hàng áp dụng cho đơn mua trên Mini Market.",
    sections: [
      {
        title: "Thời gian giao hàng",
        items: [
          "Thời gian dự kiến phụ thuộc vào địa chỉ nhận, thời gian chuẩn bị hàng và đối tác vận chuyển.",
          "Ngày lễ, thời tiết xấu hoặc khu vực xa có thể làm thời gian giao kéo dài hơn dự kiến.",
          "Bạn có thể theo dõi trạng thái vận chuyển trong chi tiết đơn hàng.",
        ],
      },
      {
        title: "Nhận hàng",
        items: [
          "Kiểm tra tình trạng kiện hàng, niêm phong và thông tin người nhận trước khi thanh toán COD.",
          "Nếu kiện hàng có dấu hiệu hư hỏng hoặc sai thông tin, hãy ghi nhận hình ảnh và liên hệ hỗ trợ.",
          "Phí vận chuyển được tính theo địa chỉ, khối lượng, kích thước và chương trình khuyến mãi nếu có.",
        ],
      },
    ],
  },
  returns: {
    title: "Chính sách đổi trả",
    description: "Điều kiện, thời hạn và quy trình gửi yêu cầu đổi trả/hoàn tiền.",
    sections: [
      {
        title: "Điều kiện áp dụng",
        items: [
          "Sản phẩm lỗi, hư hỏng trong vận chuyển, sai mô tả, sai phân loại hoặc giao thiếu có thể được xem xét đổi trả.",
          "Sản phẩm cần còn đầy đủ phụ kiện, quà tặng kèm, tem nhãn và bao bì trong khả năng hợp lý.",
          "Một số nhóm hàng như thực phẩm, sản phẩm cá nhân hoặc hàng đặt riêng có thể có điều kiện riêng.",
        ],
      },
      {
        title: "Quy trình xử lý",
        items: [
          "Gửi yêu cầu trong thời hạn hiển thị trên đơn hàng và cung cấp hình ảnh/video làm bằng chứng.",
          "Mini Market, người bán và đơn vị vận chuyển sẽ cùng kiểm tra thông tin để đưa ra phương án phù hợp.",
          "Hoàn tiền hoặc đổi sản phẩm được thực hiện sau khi yêu cầu được duyệt theo chính sách hiện hành.",
        ],
      },
    ],
  },
};

export const legalPages: Record<string, FooterPage> = {
  terms: {
    title: "Điều khoản dịch vụ",
    description:
      "Các điều khoản này quy định việc truy cập, mua bán và sử dụng dịch vụ trên Mini Market.",
    updatedAt: "Cập nhật: 21/06/2026",
    sections: [
      {
        title: "Chấp nhận điều khoản",
        items: [
          "Khi truy cập hoặc sử dụng Mini Market, bạn xác nhận đã đọc, hiểu và đồng ý tuân thủ các điều khoản này.",
          "Nếu không đồng ý với bất kỳ nội dung nào, bạn nên ngừng sử dụng dịch vụ.",
          "Mini Market có thể cập nhật điều khoản theo thời gian và phiên bản mới sẽ có hiệu lực khi được đăng tải.",
        ],
      },
      {
        title: "Tài khoản người dùng",
        items: [
          "Bạn chịu trách nhiệm bảo mật thông tin đăng nhập và mọi hoạt động phát sinh từ tài khoản của mình.",
          "Thông tin cung cấp cần chính xác, cập nhật và không được mạo danh cá nhân hoặc tổ chức khác.",
          "Mini Market có quyền tạm khóa hoặc hạn chế tài khoản nếu phát hiện dấu hiệu vi phạm, gian lận hoặc gây rủi ro cho cộng đồng.",
        ],
      },
      {
        title: "Giao dịch trên sàn",
        items: [
          "Mini Market cung cấp nền tảng kết nối người mua và người bán; người bán chịu trách nhiệm về thông tin, chất lượng và tính hợp pháp của sản phẩm đăng bán.",
          "Giá, phí vận chuyển, khuyến mãi và thời gian giao hàng có thể thay đổi theo từng đơn hàng, khu vực và chương trình.",
          "Người mua cần kiểm tra kỹ thông tin sản phẩm, địa chỉ nhận hàng và phương thức thanh toán trước khi xác nhận đặt hàng.",
        ],
      },
      {
        title: "Hành vi bị cấm",
        items: [
          "Đăng bán hàng giả, hàng cấm, hàng vi phạm quyền sở hữu trí tuệ hoặc sản phẩm không đáp ứng quy định pháp luật.",
          "Lợi dụng khuyến mãi, đánh giá, hoàn tiền hoặc hệ thống thanh toán để trục lợi.",
          "Can thiệp kỹ thuật, thu thập dữ liệu trái phép, phát tán mã độc hoặc gây gián đoạn hoạt động của nền tảng.",
        ],
      },
      {
        title: "Xử lý vi phạm và giới hạn trách nhiệm",
        items: [
          "Mini Market có thể gỡ nội dung, hủy đơn, giữ thanh toán, hạn chế tính năng hoặc khóa tài khoản khi có căn cứ hợp lý về vi phạm.",
          "Nền tảng không chịu trách nhiệm cho thiệt hại gián tiếp phát sinh ngoài phạm vi kiểm soát hợp lý, bao gồm sự cố từ đối tác thanh toán, vận chuyển hoặc sự kiện bất khả kháng.",
          "Các tranh chấp sẽ được ưu tiên xử lý qua thương lượng, hòa giải và quy trình giải quyết khiếu nại của Mini Market.",
        ],
      },
    ],
  },
  privacy: {
    title: "Chính sách bảo mật",
    description: "Cách Mini Market thu thập, sử dụng, lưu trữ và bảo vệ dữ liệu cá nhân.",
    updatedAt: "Cập nhật: 21/06/2026",
    sections: [
      {
        title: "Thông tin được thu thập",
        items: [
          "Thông tin tài khoản như họ tên, email, số điện thoại, địa chỉ và thông tin xác thực.",
          "Thông tin giao dịch như đơn hàng, thanh toán, vận chuyển, đổi trả và lịch sử hỗ trợ.",
          "Dữ liệu kỹ thuật như thiết bị, trình duyệt, địa chỉ IP, cookie và hành vi sử dụng nhằm cải thiện dịch vụ.",
        ],
      },
      {
        title: "Mục đích sử dụng",
        items: [
          "Xử lý đơn hàng, thanh toán, giao hàng, chăm sóc khách hàng và giải quyết tranh chấp.",
          "Cá nhân hóa trải nghiệm, đề xuất sản phẩm, phát hiện gian lận và bảo vệ an toàn nền tảng.",
          "Gửi thông báo giao dịch, cập nhật chính sách và nội dung tiếp thị khi bạn cho phép hoặc pháp luật cho phép.",
        ],
      },
      {
        title: "Chia sẻ và bảo vệ dữ liệu",
        items: [
          "Dữ liệu có thể được chia sẻ với người bán, đơn vị vận chuyển, thanh toán và nhà cung cấp dịch vụ liên quan để hoàn tất giao dịch.",
          "Mini Market áp dụng biện pháp kỹ thuật và tổ chức phù hợp để giảm rủi ro truy cập, mất mát hoặc sử dụng trái phép.",
          "Bạn có thể yêu cầu cập nhật, chỉnh sửa hoặc xem xét xóa dữ liệu theo điều kiện pháp luật và chính sách lưu trữ.",
        ],
      },
    ],
  },
  dispute: {
    title: "Giải quyết tranh chấp",
    description: "Quy trình tiếp nhận, xác minh và xử lý khiếu nại giữa người mua và người bán.",
    sections: [
      {
        title: "Nguyên tắc xử lý",
        items: [
          "Ưu tiên trao đổi thiện chí, dựa trên bằng chứng và lịch sử giao dịch trên hệ thống.",
          "Mini Market có thể yêu cầu ảnh, video, biên bản vận chuyển hoặc thông tin bổ sung để xác minh.",
          "Quyết định xử lý sẽ cân nhắc chính sách sàn, quy định pháp luật và quyền lợi hợp lý của các bên.",
        ],
      },
      {
        title: "Các bước thực hiện",
        items: [
          "Người mua gửi khiếu nại trong chi tiết đơn hàng hoặc qua trung tâm hỗ trợ.",
          "Người bán phản hồi trong thời hạn được thông báo và cung cấp phương án xử lý.",
          "Nếu hai bên không thống nhất, Mini Market sẽ xem xét bằng chứng và đề xuất hoàn tiền, đổi hàng, trả hàng hoặc phương án khác.",
        ],
      },
    ],
  },
  inspection: {
    title: "Chính sách kiểm hàng",
    description: "Hướng dẫn kiểm tra kiện hàng và ghi nhận bằng chứng khi nhận sản phẩm.",
    sections: [
      {
        title: "Phạm vi kiểm hàng",
        items: [
          "Bạn có thể kiểm tra tình trạng bên ngoài kiện hàng, thông tin người nhận và dấu hiệu hư hỏng trước khi nhận.",
          "Việc mở hộp kiểm chi tiết phụ thuộc vào chính sách của người bán, đơn vị vận chuyển và loại sản phẩm.",
          "Không sử dụng thử hoặc làm thay đổi tình trạng sản phẩm khi chưa hoàn tất quy trình nhận hàng theo hướng dẫn.",
        ],
      },
      {
        title: "Bằng chứng cần lưu",
        items: [
          "Chụp ảnh hoặc quay video quá trình mở kiện nếu sản phẩm có giá trị cao hoặc dễ phát sinh tranh chấp.",
          "Giữ lại tem vận đơn, bao bì, phụ kiện và quà tặng kèm cho đến khi xác nhận sản phẩm ổn định.",
          "Liên hệ hỗ trợ sớm nếu phát hiện thiếu hàng, sai hàng, vỡ hỏng hoặc dấu hiệu bị can thiệp.",
        ],
      },
    ],
  },
};

export const sellerPages: Record<string, FooterPage> = {
  index: {
    title: "Kênh người bán",
    description:
      "Không gian dành cho nhà bán hàng quản lý sản phẩm, đơn hàng, vận hành và phát triển kinh doanh trên Mini Market.",
    sections: [
      {
        title: "Bạn có thể làm gì",
        items: [
          "Tạo gian hàng, cập nhật hồ sơ shop và thiết lập thông tin liên hệ.",
          "Đăng bán sản phẩm, quản lý tồn kho, giá, hình ảnh và chương trình khuyến mãi.",
          "Theo dõi đơn hàng, hiệu suất bán hàng và phản hồi khách hàng.",
        ],
      },
      {
        title: "Cam kết vận hành",
        items: [
          "Cung cấp thông tin sản phẩm trung thực, rõ nguồn gốc và tuân thủ pháp luật.",
          "Xử lý đơn đúng thời hạn, đóng gói phù hợp và phối hợp khi phát sinh đổi trả/khiếu nại.",
          "Duy trì chất lượng dịch vụ để bảo vệ trải nghiệm người mua và uy tín gian hàng.",
        ],
      },
    ],
  },
  register: {
    title: "Bắt đầu bán hàng",
    description: "Các bước chuẩn bị để mở gian hàng và đăng bán sản phẩm đầu tiên.",
    sections: [
      {
        title: "Chuẩn bị hồ sơ",
        items: [
          "Thông tin cá nhân hoặc doanh nghiệp, địa chỉ lấy hàng, số điện thoại và email liên hệ.",
          "Thông tin thanh toán nhận doanh thu và giấy tờ liên quan nếu ngành hàng yêu cầu.",
          "Ảnh đại diện, tên shop, mô tả shop và chính sách chăm sóc khách hàng cơ bản.",
        ],
      },
      {
        title: "Đăng bán sản phẩm",
        items: [
          "Chọn đúng danh mục, tên sản phẩm rõ ràng và hình ảnh thể hiện đúng hàng hóa.",
          "Cung cấp mô tả, thông số, phân loại, tồn kho, giá và khối lượng/kích thước đóng gói.",
          "Kiểm tra quy định ngành hàng trước khi công khai sản phẩm.",
        ],
      },
    ],
  },
  policy: {
    title: "Quy định đăng bán",
    description: "Các tiêu chuẩn nội dung và hàng hóa dành cho người bán trên Mini Market.",
    sections: [
      {
        title: "Nội dung sản phẩm",
        items: [
          "Tên, hình ảnh, mô tả và thuộc tính sản phẩm phải chính xác, không gây nhầm lẫn.",
          "Không sử dụng từ khóa, thương hiệu hoặc hình ảnh vi phạm quyền sở hữu trí tuệ.",
          "Không đăng nội dung phản cảm, phân biệt đối xử, sai sự thật hoặc lôi kéo giao dịch ngoài nền tảng.",
        ],
      },
      {
        title: "Hàng hóa hạn chế",
        items: [
          "Không đăng bán hàng cấm, hàng giả, hàng nhập lậu hoặc sản phẩm không đủ điều kiện lưu hành.",
          "Nhóm hàng có điều kiện cần giấy phép, chứng nhận hoặc tài liệu bổ sung khi Mini Market yêu cầu.",
          "Sản phẩm vi phạm có thể bị gỡ, hạn chế hiển thị, hủy đơn hoặc xử lý tài khoản.",
        ],
      },
    ],
  },
  pricing: {
    title: "Phí dịch vụ & hoa hồng",
    description: "Thông tin tổng quan về các khoản phí có thể áp dụng cho người bán.",
    sections: [
      {
        title: "Các loại phí",
        items: [
          "Phí thanh toán hoặc xử lý giao dịch tùy phương thức thanh toán.",
          "Hoa hồng nền tảng theo ngành hàng, chương trình hoặc thỏa thuận người bán.",
          "Phí dịch vụ bổ sung nếu người bán sử dụng quảng cáo, gói vận hành hoặc tiện ích nâng cao.",
        ],
      },
      {
        title: "Minh bạch đối soát",
        items: [
          "Doanh thu, phí và hoàn tiền được ghi nhận trong lịch sử giao dịch của người bán.",
          "Các điều chỉnh do hủy đơn, đổi trả hoặc tranh chấp sẽ được phản ánh trong kỳ đối soát phù hợp.",
          "Mini Market sẽ thông báo khi có thay đổi quan trọng về biểu phí hoặc cách tính phí.",
        ],
      },
    ],
  },
};
