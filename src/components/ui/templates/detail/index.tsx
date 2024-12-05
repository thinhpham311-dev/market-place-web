import * as React from "react"

//components
import { SliderWithThumbnails } from "@/components/ui/organisms"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    Counter
} from "@/components/ui/molecules"

//datas
import { images } from "@/constants/data"

//icons
import { CircleDollarSign } from "lucide-react"
import { MdOutlineStar, MdOutlineStarBorder } from "react-icons/md";


const Detail = () => {
    return (
        <>

            <Card layout="horizontal" className="border-none grid md:grid-cols-3 grid-cols-1 gap-5 md:px-12 px-0">
                <SliderWithThumbnails data={images} />
                <CardContent className="p-6 space-y-4 md:col-span-2">
                    <CardTitle className="line-clamp-2 ">[Choice] Bông tẩy trang Lameila XB01 222 miếng cotton pad</CardTitle>
                    <CardDescription className="space-y-3">
                        <span className="flex items-center space-x-1">
                            <MdOutlineStar size={20} />
                            <MdOutlineStar size={20} />
                            <MdOutlineStarBorder size={20} />
                            <MdOutlineStarBorder size={20} />
                            <MdOutlineStarBorder size={20} />
                        </span>
                        <div className="space-x-4">
                            <p className="inline-flex items-center gap-x-1 text-md"><CircleDollarSign size={15} /> <span className="font-bold "> 80</span></p>
                            <p className="inline-flex items-center gap-x-1 line-through text-md"><CircleDollarSign size={15} /><span>100</span></p>
                        </div>
                        <div>
                            <Counter />
                        </div>
                    </CardDescription>

                </CardContent>
                <Card className="md:col-span-3 col-span-1 ">
                    <CardHeader>
                        <CardTitle>THÔNG TIN SẢN PHẨM</CardTitle>
                    </CardHeader>
                    <CardContent >
                        <div><div><p>Tên sản phẩm: [Choice] Bông tẩy trang Lameila XB01 222 miếng cotton pad</p><p>
                        </p><p>1. Tính năng đặc biệt và ưu điểm nổi trội </p><p>
                            </p><p>- Thành phần tự nhiên 100% cotton, chất bông mềm mịn.</p><p>
                            </p><p>- Miếng bông có thiết kế hình vuông, kích thước 6x5cm, cực kỳ vừa vặn khi sử dụng.</p><p>
                            </p><p>- Hai mặt bông được ép chặt, không bị xơ khi tẩy trang tiện dụng với thiết kế 3 lớp 2 mặt đa năng.</p><p>
                            </p><p>- Bông tẩy trang 222 miếng an toàn cho da với thành phần tự nhiên và siêu tiết kiệm.</p><p>
                            </p><p>2. Thành phần của sản phẩm</p><p>
                            </p><p>- Bông Tẩy Trang 222 Miếng Cotton Pads là sản phẩm bông làm từ 100% cotton, không sử dụng chất tẩy trắng.</p><p>
                            </p><p>- Sợi bông mềm mại được tiệt trùng, đảm bảo an toàn và lành tính cho da.</p><p>
                            </p><p>3. Công dụng</p><p>
                            </p><p>- Sử dụng dễ dàng, thoải mái cho da nhờ độ mềm và dai.</p><p>
                            </p><p>- Khả năng thấm hút cực tốt nên sẽ không khiến dung dịch tẩy trang bị lãng phí.</p><p>
                            </p><p>- Không bị vỡ, rách, tung lớp bông ra nên dùng được lâu và không ảnh hưởng tới da mặt.</p><p>
                            </p><p>- Lấy đi từng lớp cặn trang điểm trên bề mặt, bụi bẩn và tế bào chết đang làm tắc nghẽn lỗ chân lông.</p><p>
                            </p><p>4. Phù hợp với ai, với đối tượng nào</p><p>
                            </p><p>- Dùng cho cả nam và nữ.</p><p>
                            </p><p>- Phù hợp với nhiều đối tượng có nhu cầu sử dụng để tẩy trang, làm sạch da.</p><p>
                            </p><p>- Dành cho người thường xuyên trang điểm, chăm sóc da.</p><p>
                            </p><p>- Thích hợp cho nhiều loại da kể cả da nhạy cảm.</p><p>
                            </p><p>- Dùng được cho cả trẻ nhỏ.</p><p>
                            </p><p>5. Hướng dẫn sử dụng</p><p>
                            </p><p>- Khi dưỡng da</p><p>
                            </p><p>  + Tẩm nước hoa hồng cơ bản lên miếng bông tẩy trang rồi sử dụng để massage mặt.</p><p>
                            </p><p>  + Để ngấm nước hoa hồng toàn bộ bông tẩy trang rồi đắp lên mặt 10-15p là bạn có thể thay mặt nạ dưỡng ẩm giúp da mịn màng hơn.</p><p>
                            </p><p>- Khi tẩy trang</p><p>
                            </p><p>  + Dùng dung dịch tẩy trang massage mặt, tiếp theo đó sử dụng bông tẩy trang lau sạch.</p><p>
                            </p><p>  + Thấm dung dịch tẩy trang lên bông, sau đó dùng bông lau những vùng da cần tẩy trang.</p><p>
                            </p><p>6. Quy cách &amp; thông tin, thông số chi tiết:</p><p>
                            </p><p>- Bông Tẩy Trang 222 Miếng Cotton Pads gồm 222 miếng được đóng gói trong bao bì nylon tiện lợi</p><p>
                            </p><p>- Miếng bông có kích thước nhỏ gọn 5x6cm dễ dàng sử dụng.</p><p>
                            </p><p>7. Hướng dẫn bảo quản &amp; thời hạn sử dụng</p><p>
                            </p><p>- Bảo quản nơi khô ráo, tránh ánh nắng mặt trời trực tiếp và nhiệt độ cao.</p><p>
                            </p><p>- Thời hạn sử dụng là 3 năm kể từ ngày sản xuất</p><p>
                            </p><p>✪ Lưu ý khi mua hàng: Khách tham khảo kỹ bảng size, mô tả sản phẩm và ảnh cận chất liệu để lựa chọn sản phẩm phù hợp với mình (tránh trường hợp mua sản phẩm không phù hợp với ý thích). Mọi thắc mắc khác vui lòng liên hệ qua Shopee chat để được trả lời nhanh nhất.</p><p>#shopeechoice #shopeechoicevietnam #choicevietnam</p></div></div>
                    </CardContent>
                </Card>
            </Card>
        </>
    )
}

export default Detail
