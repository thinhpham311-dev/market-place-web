import type { SupportedLanguage } from "@/store/settings/languageSlice";

export type TranslationKey =
  | "see_more"
  | "language_label"
  | "filters"
  | "clear_all"
  | "show_more"
  | "show_less"
  | "not_supported_filter_type"
  | "popular_products"
  | "popular_products_desc"
  | "bundle_deals"
  | "bundle_deals_desc"
  | "hot_deals"
  | "hot_deals_desc"
  | "recommended_for_you"
  | "recommended_for_you_desc"
  | "from_the_same_shop"
  | "from_the_same_shop_desc"
  | "top_picks_from_shop"
  | "top_picks_from_shop_desc"
  | "search_products"
  | "search_products_desc"
  | "daily_discover"
  | "daily_discover_desc"
  | "popular_categories"
  | "popular_categories_desc"
  | "featured_brands"
  | "featured_brands_desc"
  | "shop_by_brand"
  | "shop_by_brand_desc"
  | "verify_email_otp"
  | "verify_email_otp_desc"
  | "sign_in"
  | "sign_up"
  | "change_password"
  | "update_profile_user"
  | "fresh_picks_daily"
  | "discover_products_worth_opening"
  | "discover_products_worth_opening_desc"
  | "items_found"
  | "marketplace_feed"
  | "popular_tab"
  | "bundle_deals_tab"
  | "recommended_tab"
  | "trending_deals_tab"
  | "fast_delivery_tab"
  | "top_rated_tab"
  | "best_value_tab"
  | "fresh_arrivals_tab"
  | "daily_discover_popular_desc"
  | "daily_discover_bundle_deals_desc"
  | "daily_discover_recommended_desc"
  | "daily_discover_trending_desc"
  | "daily_discover_fast_delivery_desc"
  | "daily_discover_top_rated_desc"
  | "daily_discover_best_value_desc"
  | "daily_discover_fresh_arrivals_desc"
  | "daily_discover_trust_fast_dispatch"
  | "daily_discover_trust_fast_dispatch_desc"
  | "daily_discover_trust_trusted_sellers"
  | "daily_discover_trust_trusted_sellers_desc"
  | "daily_discover_trust_hot_pricing"
  | "daily_discover_trust_hot_pricing_desc"
  | "all_categories"
  | "all_categories_desc"
  | "category_subcategories_count"
  | "browse_this_category"
  | "brands"
  | "categories"
  | "conditions"
  | "promotions"
  | "services"
  | "ratings"
  | "used"
  | "new_with_tag"
  | "on_sale"
  | "clearance_sale"
  | "ready_stock"
  | "whole_sale"
  | "anything_cheap"
  | "free_shipping"
  | "cod_available"
  | "return_7_days"
  | "warranty_included"
  | "star_1"
  | "star_2"
  | "star_3"
  | "star_4"
  | "star_5"
  | "sort_newest"
  | "sort_popularity"
  | "sort_price_low_to_high"
  | "sort_price_high_to_low"
  | "price_min"
  | "price_max"
  | "cart_select_all_products"
  | "cart_column_image"
  | "cart_column_name"
  | "cart_column_variants"
  | "cart_column_unit"
  | "cart_column_quantity"
  | "cart_column_total"
  | "cart_column_features"
  | "cart_voucher_code"
  | "cart_view_more"
  | "cart_delete_all"
  | "cart_checkout"
  | "cart_total"
  | "checkout_estimated_shipping"
  | "cart_title"
  | "footer_help_center"
  | "footer_how_to_order"
  | "footer_payment_methods"
  | "footer_shipping_delivery"
  | "footer_return_policy"
  | "footer_terms_of_service"
  | "footer_privacy_policy"
  | "footer_dispute_resolution"
  | "footer_inspection_policy"
  | "footer_faq"
  | "footer_seller_center"
  | "footer_start_selling"
  | "footer_listing_guidelines"
  | "footer_service_fees"
  | "footer_badge_nationwide_delivery"
  | "footer_badge_secure_payments"
  | "footer_badge_easy_returns"
  | "footer_badge_customer_support"
  | "footer_brand_name"
  | "brand_logo_alt"
  | "footer_brand_desc"
  | "footer_support_hours"
  | "footer_customer_care"
  | "footer_policies"
  | "footer_for_sellers"
  | "footer_payments"
  | "footer_shipping"
  | "footer_all_rights_reserved"
  | "footer_trusted_marketplace"
  | "footer_protected_transactions"
  | "footer_support_businesses"
  | "checkout_payment_method"
  | "checkout_payment_method_desc"
  | "checkout_selected"
  | "checkout_choose"
  | "checkout_your_items"
  | "checkout_your_items_desc"
  | "checkout_edit_cart"
  | "checkout_shop"
  | "checkout_qty"
  | "checkout_no_items"
  | "checkout_order_summary"
  | "checkout_items"
  | "checkout_estimated_tax"
  | "checkout_placing_order"
  | "checkout_terms_notice"
  | "checkout_sign_in_continue"
  | "checkout_sign_in_continue_desc"
  | "checkout_go_to_sign_in"
  | "checkout_place_order"
  | "checkout_sign_in_before_payment_error"
  | "checkout_empty_error"
  | "checkout_order_placed_success"
  | "checkout_payment_cod"
  | "checkout_payment_cod_desc"
  | "checkout_payment_bank_transfer"
  | "checkout_payment_bank_transfer_desc"
  | "checkout_payment_stripe"
  | "checkout_payment_stripe_desc"
  | "checkout_shipping_details"
  | "checkout_shipping_details_desc"
  | "checkout_full_name"
  | "checkout_recipient_name_placeholder"
  | "checkout_email"
  | "checkout_email_placeholder"
  | "checkout_phone"
  | "checkout_phone_placeholder"
  | "checkout_city"
  | "checkout_city_placeholder"
  | "checkout_postal_code"
  | "checkout_postal_code_placeholder"
  | "checkout_country"
  | "checkout_country_placeholder"
  | "checkout_address"
  | "checkout_address_placeholder"
  | "checkout_order_note"
  | "checkout_order_note_placeholder"
  | "search_scope_marketplace"
  | "search_scope_shop"
  | "search_placeholder"
  | "search_scope_placeholder"
  | "validation_choose_valid_search_scope"
  | "validation_enter_at_least_2_characters"
  | "validation_enter_no_more_than_100_characters"
  | "form_phone"
  | "form_password"
  | "form_remember_me"
  | "form_signing_in"
  | "validation_enter_at_least_8_characters"
  | "validation_enter_no_more_than_50_characters"
  | "validation_password_no_spaces"
  | "validation_phone_required"
  | "validation_enter_at_least_10_characters"
  | "validation_enter_at_least_4_characters"
  | "validation_enter_no_more_than_25_characters"
  | "validation_enter_no_more_than_8_characters"
  | "validation_invalid_number"
  | "sign_in_phone_placeholder"
  | "sign_in_password_placeholder"
  | "form_first_name"
  | "form_last_name"
  | "form_email"
  | "form_phone_number"
  | "form_confirm_password"
  | "sign_up_first_name_placeholder"
  | "sign_up_last_name_placeholder"
  | "sign_up_email_placeholder"
  | "sign_up_phone_placeholder"
  | "sign_up_password_placeholder"
  | "sign_up_confirm_password_placeholder"
  | "form_creating_account"
  | "form_create_account"
  | "validation_first_name_invalid_characters"
  | "validation_last_name_invalid_characters"
  | "validation_valid_email"
  | "validation_password_uppercase"
  | "validation_password_lowercase"
  | "validation_password_number"
  | "validation_confirm_password_required"
  | "validation_passwords_do_not_match"
  | "validation_password_not_same_as_phone"
  | "form_new_password"
  | "form_confirm_new_password"
  | "change_password_current_placeholder"
  | "change_password_new_placeholder"
  | "change_password_confirm_placeholder"
  | "form_save"
  | "validation_new_password_confirmation_required"
  | "validation_new_password_must_match"
  | "validation_new_password_different"
  | "form_otp_code"
  | "check_otp_email_placeholder"
  | "check_otp_code_placeholder"
  | "form_verifying"
  | "form_verify_email"
  | "validation_otp_numbers_only"
  | "form_full_name"
  | "form_user_name"
  | "form_gender"
  | "form_choose_gender"
  | "form_address"
  | "update_profile_full_name_placeholder"
  | "update_profile_user_name_placeholder"
  | "update_profile_phone_placeholder"
  | "update_profile_gender_placeholder"
  | "update_profile_email_placeholder"
  | "update_profile_address_placeholder"
  | "gender_male"
  | "gender_female"
  | "validation_enter_at_least_3_characters"
  | "validation_enter_no_more_than_250_characters"
  | "validation_username_invalid_characters"
  | "validation_email_required"
  | "validation_invalid_email"
  | "validation_choose_valid_gender"
  | "validation_enter_at_least_5_characters"
  | "header_my_account"
  | "header_my_purchase"
  | "header_sign_out"
  | "theme_toggle_sr_only"
  | "theme_light"
  | "theme_dark"
  | "theme_system"
  | "common_something_went_wrong"
  | "common_no_data_found"
  | "common_no_results"
  | "product_specifications"
  | "product_no_specifications"
  | "product_description_title"
  | "product_no_description"
  | "product_share"
  | "product_wishlist"
  | "product_add_to_cart"
  | "product_buy_now"
  | "product_quantity"
  | "product_in_stock"
  | "product_pieces_available"
  | "product_breadcrumb_home"
  | "product_spec_name"
  | "product_spec_categories"
  | "product_spec_shop_name"
  | "product_spec_brand"
  | "shop_rating"
  | "shop_products"
  | "shop_followers"
  | "shop_joined"
  | "shop_response_rate"
  | "shop_response_time"
  | "shop_following"
  | "shop_follow"
  | "shop_view"
  | "shop_name_fallback"
  | "not_found_title"
  | "not_found_description"
  | "not_found_back_home"
  | "not_found_browse_categories"
  | "toast_close"
  | "auth_sign_in_success"
  | "auth_sign_in_failed"
  | "auth_sign_up_success"
  | "auth_sign_up_failed"
  | "auth_check_otp_success"
  | "auth_check_otp_failed"
  | "quantity_reached_maximum"
  | "quantity_limit_warning"
  | "review_validation_missing"
  | "review_submit"
  | "review_placeholder"
  | "review_average_rating"
  | "review_distribution"
  | "review_total_reviews"
  | "cart_quantity_updated_title"
  | "cart_quantity_updated_desc"
  | "cart_load_failed"
  | "api_server_error"
  | "api_invalid_request"
  | "cart_deleted_selected_title"
  | "cart_deleted_selected_desc"
  | "option_validation_error"
  | "cart_variants_updated_title"
  | "cart_variants_updated_desc"
  | "cart_item_removed_title"
  | "cart_item_removed_desc"
  | "cart_remove_tooltip"
  | "cart_add_success_title"
  | "cart_add_success_desc"
  | "cart_selected_all"
  | "cart_item_count"
  | "cart_delete_items"
  | "cart_voucher_label"
  | "cart_voucher_desc"
  | "cart_shipping_label"
  | "cart_shipping_desc"
  | "sidebar_main_navigation"
  | "sidebar_back_home"
  | "sidebar_toggle"
  | "sidebar_menu"
  | "sidebar_shop_live"
  | "sidebar_flash_sale"
  | "sidebar_categories"
  | "sidebar_product_type_1"
  | "sidebar_product_type_2"
  | "sidebar_saved_stores"
  | "sidebar_shops"
  | "sidebar_shop_1"
  | "sidebar_shop_2"
  | "sidebar_profile_info"
  | "sidebar_privacy_settings"
  | "sidebar_notifications"
  | "sidebar_orders"
  | "sidebar_order_update"
  | "sidebar_promotions"
  | "sidebar_wallet_update"
  | "sidebar_marketplace_update"
  | "flash_sale_badge"
  | "flash_sale_title"
  | "flash_sale_desc"
  | "flash_sale_highlight_limited"
  | "flash_sale_highlight_fast"
  | "flash_sale_highlight_daily"
  | "flash_sale_label"
  | "flash_sale_page_desc"
  | "admin_seller_centre"
  | "admin_download";

export const translations: Record<SupportedLanguage, Record<TranslationKey, string>> = {
  en: {
    see_more: "See more",
    language_label: "Language",
    filters: "Filters",
    clear_all: "Clear all",
    show_more: "Show more",
    show_less: "Show less",
    not_supported_filter_type: "This filter type is not supported",
    popular_products: "Popular Products",
    popular_products_desc: "Bestsellers shoppers keep coming back to.",
    bundle_deals: "Bundle Deals",
    bundle_deals_desc: "More value when you buy together.",
    hot_deals: "Hot Deals",
    hot_deals_desc: "Limited-time offers worth catching now.",
    recommended_for_you: "Recommended For You",
    recommended_for_you_desc: "Picked to match what shoppers are likely to want next.",
    from_the_same_shop: "From The Same Shop",
    from_the_same_shop_desc: "More items from the shop you're viewing now.",
    top_picks_from_shop: "Top Picks from Shop",
    top_picks_from_shop_desc: "Standout picks selected from this shop.",
    search_products: "Search Products",
    search_products_desc: "Explore products that match what you're looking for.",
    daily_discover: "Daily Discover",
    daily_discover_desc: "Fresh finds, trending picks, and everyday deals.",
    popular_categories: "Popular Categories",
    popular_categories_desc: "Categories shoppers browse the most.",
    featured_brands: "Featured Brands",
    featured_brands_desc: "Popular brands worth exploring.",
    shop_by_brand: "Shop By Brand",
    shop_by_brand_desc: "Browse products from the most popular brands in our marketplace.",
    verify_email_otp: "Verify Email OTP",
    verify_email_otp_desc:
      "Enter the OTP code sent to your email address to complete your account setup.",
    sign_in: "Sign In",
    sign_up: "Sign Up",
    change_password: "Change Password",
    update_profile_user: "Update Profile User",
    fresh_picks_daily: "Fresh picks daily",
    discover_products_worth_opening: "Discover products worth opening",
    discover_products_worth_opening_desc:
      "A scrollable feed of products built for easy browsing and quick discovery.",
    items_found: "items found",
    marketplace_feed: "Marketplace feed",
    popular_tab: "Popular Products",
    bundle_deals_tab: "Bundle Deals",
    recommended_tab: "Recommended For You",
    trending_deals_tab: "Trending Deals",
    fast_delivery_tab: "Fast Delivery",
    top_rated_tab: "Top Rated",
    best_value_tab: "Best Value",
    fresh_arrivals_tab: "Fresh Arrivals",
    daily_discover_popular_desc:
      "Marketplace-wide popular products collected into the same discovery feed.",
    daily_discover_bundle_deals_desc:
      "Value-oriented product combinations surfaced inside the discovery feed.",
    daily_discover_recommended_desc:
      "Balanced marketplace picks based on the default discovery feed.",
    daily_discover_trending_desc: "Products ordered by popularity when supported by the feed.",
    daily_discover_fast_delivery_desc:
      "Quick-shop picks surfaced first inside the current discovery page.",
    daily_discover_top_rated_desc:
      "Products with the strongest visible rating on the current page.",
    daily_discover_best_value_desc:
      "Lower-priced items prioritized for value-focused browsing.",
    daily_discover_fresh_arrivals_desc: "Newest arrivals in the current discovery stream.",
    daily_discover_trust_fast_dispatch: "Fast dispatch",
    daily_discover_trust_fast_dispatch_desc:
      "Ready-to-ship picks prioritized for everyday shopping.",
    daily_discover_trust_trusted_sellers: "Trusted sellers",
    daily_discover_trust_trusted_sellers_desc:
      "Curated products from shops with reliable service signals.",
    daily_discover_trust_hot_pricing: "Hot pricing",
    daily_discover_trust_hot_pricing_desc:
      "Popular listings surfaced with competitive marketplace pricing.",
    all_categories: "All Categories",
    all_categories_desc: "Browse every category available across the marketplace.",
    category_subcategories_count: "subcategories",
    browse_this_category: "Browse this category",
    brands: "Brands",
    categories: "Categories",
    conditions: "Conditions",
    promotions: "Promotions",
    services: "Services",
    ratings: "Ratings",
    used: "Used",
    new_with_tag: "New with tag",
    on_sale: "On sale",
    clearance_sale: "Clearance Sale",
    ready_stock: "Ready Stock",
    whole_sale: "Wholesale",
    anything_cheap: "Anything Cheap",
    free_shipping: "Free Shipping",
    cod_available: "COD Available",
    return_7_days: "7-day Return",
    warranty_included: "Warranty Included",
    star_1: "1 Star",
    star_2: "2 Stars",
    star_3: "3 Stars",
    star_4: "4 Stars",
    star_5: "5 Stars",
    sort_newest: "Newest",
    sort_popularity: "Popularity",
    sort_price_low_to_high: "Price: Low to High",
    sort_price_high_to_low: "Price: High to Low",
    price_min: "Min",
    price_max: "Max",
    cart_select_all_products: "Select all products",
    cart_column_image: "Image",
    cart_column_name: "Name",
    cart_column_variants: "Variants",
    cart_column_unit: "Unit",
    cart_column_quantity: "Quantity",
    cart_column_total: "Total",
    cart_column_features: "Features",
    cart_voucher_code: "Voucher Code",
    cart_view_more: "View More",
    cart_delete_all: "Delete All",
    cart_checkout: "Check Out",
    cart_total: "Total",
    checkout_estimated_shipping: "Estimated Shipping",
    cart_title: "Cart",
    footer_help_center: "Help Center",
    footer_how_to_order: "How to Order",
    footer_payment_methods: "Payment Methods",
    footer_shipping_delivery: "Shipping & Delivery",
    footer_return_policy: "Return Policy",
    footer_terms_of_service: "Terms of Service",
    footer_privacy_policy: "Privacy Policy",
    footer_dispute_resolution: "Dispute Resolution",
    footer_inspection_policy: "Inspection Policy",
    footer_faq: "Frequently Asked Questions",
    footer_seller_center: "Seller Center",
    footer_start_selling: "Start Selling",
    footer_listing_guidelines: "Listing Guidelines",
    footer_service_fees: "Service Fees & Commission",
    footer_badge_nationwide_delivery: "Nationwide Delivery",
    footer_badge_secure_payments: "Secure Payments",
    footer_badge_easy_returns: "Easy Returns",
    footer_badge_customer_support: "24/7 Customer Support",
    footer_brand_name: "Market Place",
    brand_logo_alt: "Market Place Logo",
    footer_brand_desc:
      "A multi-category shopping platform with authentic products, fast delivery, and clear post-purchase support for both buyers and sellers.",
    footer_support_hours: "Support available daily from 08:00 to 22:00",
    footer_customer_care: "Customer Care",
    footer_policies: "Policies",
    footer_for_sellers: "For Sellers",
    footer_payments: "Payments",
    footer_shipping: "Shipping",
    footer_all_rights_reserved: "All rights reserved.",
    footer_trusted_marketplace: "Trusted eCommerce Marketplace",
    footer_protected_transactions: "Protected Transactions",
    footer_support_businesses: "Support for Sellers and Businesses",
    checkout_payment_method: "Payment Method",
    checkout_payment_method_desc: "Choose how you would like to complete this purchase.",
    checkout_selected: "Selected",
    checkout_choose: "Choose",
    checkout_your_items: "Your Items",
    checkout_your_items_desc: "Review the products included in this order before placing it.",
    checkout_edit_cart: "Edit cart",
    checkout_shop: "Shop",
    checkout_qty: "Qty",
    checkout_no_items: "No items selected for checkout.",
    checkout_order_summary: "Order Summary",
    checkout_items: "Items",
    checkout_estimated_tax: "Estimated Tax",
    checkout_placing_order: "Placing order...",
    checkout_terms_notice:
      "By placing this order, you agree to the store terms, shipping policy, and return policy.",
    checkout_sign_in_continue: "Sign in to continue",
    checkout_sign_in_continue_desc: "You need to be logged in before you can continue to payment.",
    checkout_go_to_sign_in: "Go to Sign In",
    checkout_place_order: "Place Order",
    checkout_sign_in_before_payment_error: "Please sign in before continuing to payment.",
    checkout_empty_error: "Your checkout is empty. Please add items from the cart first.",
    checkout_order_placed_success: "Order placed successfully with",
    checkout_payment_cod: "Cash on Delivery",
    checkout_payment_cod_desc: "Pay when your order arrives at the delivery address.",
    checkout_payment_bank_transfer: "Bank Transfer",
    checkout_payment_bank_transfer_desc: "Transfer the payment after placing the order.",
    checkout_payment_stripe: "Stripe",
    checkout_payment_stripe_desc: "Pay securely with your debit or credit card.",
    checkout_shipping_details: "Shipping Details",
    checkout_shipping_details_desc: "Confirm where we should deliver your order and how we can reach you.",
    checkout_full_name: "Full Name",
    checkout_recipient_name_placeholder: "Enter the recipient name",
    checkout_email: "Email",
    checkout_email_placeholder: "Enter your email address",
    checkout_phone: "Phone",
    checkout_phone_placeholder: "Enter your phone number",
    checkout_city: "City",
    checkout_city_placeholder: "Enter your city",
    checkout_postal_code: "Postal Code",
    checkout_postal_code_placeholder: "Enter postal code",
    checkout_country: "Country",
    checkout_country_placeholder: "Enter your country",
    checkout_address: "Address",
    checkout_address_placeholder: "Street address, ward, district",
    checkout_order_note: "Order Note",
    checkout_order_note_placeholder: "Leave a note for the seller or courier",
    search_scope_marketplace: "In Market Place",
    search_scope_shop: "In This Shop",
    search_placeholder: "Search...",
    search_scope_placeholder: "All",
    validation_choose_valid_search_scope: "Please choose a valid search scope",
    validation_enter_at_least_2_characters: "Please enter at least 2 characters",
    validation_enter_no_more_than_100_characters: "Please enter no more than 100 characters",
    form_phone: "Phone",
    form_password: "Password",
    form_remember_me: "Remember me",
    form_signing_in: "Signing in...",
    validation_enter_at_least_8_characters: "Please enter at least 8 characters",
    validation_enter_no_more_than_50_characters: "Please enter no more than 50 characters",
    validation_password_no_spaces: "Password must not contain spaces",
    validation_phone_required: "Phone number is required",
    validation_enter_at_least_10_characters: "Please enter at least 10 characters",
    validation_enter_at_least_4_characters: "Please enter at least 4 characters",
    validation_enter_no_more_than_25_characters: "Please enter no more than 25 characters",
    validation_enter_no_more_than_8_characters: "Please enter no more than 8 characters",
    validation_invalid_number: "Invalid number",
    sign_in_phone_placeholder: "Please enter your phone number",
    sign_in_password_placeholder: "Please enter your password",
    form_first_name: "First Name",
    form_last_name: "Last Name",
    form_email: "Email",
    form_phone_number: "Phone Number",
    form_confirm_password: "Confirm Password",
    sign_up_first_name_placeholder: "Enter your first name",
    sign_up_last_name_placeholder: "Enter your last name",
    sign_up_email_placeholder: "Enter your email address",
    sign_up_phone_placeholder: "Enter your phone number",
    sign_up_password_placeholder: "Create a password",
    sign_up_confirm_password_placeholder: "Confirm your password",
    form_creating_account: "Creating account...",
    form_create_account: "Create Account",
    validation_first_name_invalid_characters: "First name contains invalid characters",
    validation_last_name_invalid_characters: "Last name contains invalid characters",
    validation_valid_email: "Please enter a valid email address",
    validation_password_uppercase: "Password must include at least 1 uppercase letter",
    validation_password_lowercase: "Password must include at least 1 lowercase letter",
    validation_password_number: "Password must include at least 1 number",
    validation_confirm_password_required: "Please confirm your password",
    validation_passwords_do_not_match: "Passwords do not match",
    validation_password_not_same_as_phone: "Password must not be the same as your phone number",
    form_new_password: "New Password",
    form_confirm_new_password: "Confirm New Password",
    change_password_current_placeholder: "Please enter password",
    change_password_new_placeholder: "Please enter new password",
    change_password_confirm_placeholder: "Please enter new password confirm",
    form_save: "Save",
    validation_new_password_confirmation_required: "New password confirmation is required",
    validation_new_password_must_match: "New password must match",
    validation_new_password_different: "New password must be different from the current password",
    form_otp_code: "OTP Code",
    check_otp_email_placeholder: "Enter your email address",
    check_otp_code_placeholder: "Enter the code sent to your email",
    form_verifying: "Verifying...",
    form_verify_email: "Verify Email",
    validation_otp_numbers_only: "OTP must contain numbers only",
    form_full_name: "Full Name",
    form_user_name: "User Name",
    form_gender: "Choose gender",
    form_choose_gender: "Please choose gender",
    form_address: "Address",
    update_profile_full_name_placeholder: "Please enter your fullname",
    update_profile_user_name_placeholder: "Please enter your username",
    update_profile_phone_placeholder: "Please enter your phone number",
    update_profile_gender_placeholder: "Please your choose gender",
    update_profile_email_placeholder: "Please enter your email",
    update_profile_address_placeholder: "Please enter your address",
    gender_male: "male",
    gender_female: "female",
    validation_enter_at_least_3_characters: "Please enter at least 3 characters",
    validation_enter_no_more_than_250_characters: "Please enter no more than 250 characters",
    validation_username_invalid_characters: "Username contains invalid characters",
    validation_email_required: "Email is required",
    validation_invalid_email: "Invalid email",
    validation_choose_valid_gender: "Please choose a valid gender",
    validation_enter_at_least_5_characters: "Please enter at least 5 characters",
    header_my_account: "My Account",
    header_my_purchase: "My Purchase",
    header_sign_out: "Sign Out",
    theme_toggle_sr_only: "Toggle theme",
    theme_light: "Light",
    theme_dark: "Dark",
    theme_system: "System",
    common_something_went_wrong: "Something went wrong.",
    common_no_data_found: "No data found.",
    common_no_results: "No results.",
    product_specifications: "Product Specifications",
    product_no_specifications: "No specifications available",
    product_description_title: "Product Description",
    product_no_description: "No product details available",
    product_share: "Share",
    product_wishlist: "Wishlist",
    product_add_to_cart: "Add To Cart",
    product_buy_now: "Buy Now",
    product_quantity: "Quantity",
    product_in_stock: "In stock",
    product_pieces_available: "pieces available",
    product_breadcrumb_home: "Home",
    product_spec_name: "Product Name:",
    product_spec_categories: "Categories:",
    product_spec_shop_name: "Shop Name:",
    product_spec_brand: "Brand:",
    shop_rating: "Rating",
    shop_products: "Products",
    shop_followers: "Followers",
    shop_joined: "Joined",
    shop_response_rate: "Response Rate",
    shop_response_time: "Response Time",
    shop_following: "Following",
    shop_follow: "Follow",
    shop_view: "View",
    shop_name_fallback: "Shop Name",
    not_found_title: "Page not found",
    not_found_description:
      "The page you are looking for may have been moved, removed, or never existed in the first place.",
    not_found_back_home: "Back to home",
    not_found_browse_categories: "Browse categories",
    toast_close: "Close",
    auth_sign_in_success: "Signed in successfully.",
    auth_sign_in_failed: "Sign in failed. Please try again.",
    auth_sign_up_success: "Your account has been created successfully.",
    auth_sign_up_failed: "Sign up failed. Please try again.",
    auth_check_otp_success: "Your email has been verified successfully.",
    auth_check_otp_failed: "OTP verification failed. Please try again.",
    quantity_reached_maximum: "Reached maximum quantity!",
    quantity_limit_warning:
      "If more quantity is added, purchase limit will be exceeded and price may change",
    review_validation_missing: "Please provide a rating and a comment.",
    review_submit: "Submit",
    review_placeholder: "Write your review here...",
    review_average_rating: "Average Rating",
    review_distribution: "Rating Distribution",
    review_total_reviews: "total reviews",
    cart_quantity_updated_title: "Quantity updated",
    cart_quantity_updated_desc: "The product {product} x {quantity} has been updated in your cart.",
    cart_load_failed: "Unable to load cart",
    api_server_error: "A server error occurred. Please try again later.",
    api_invalid_request: "Invalid request.",
    cart_deleted_selected_title: "Selected items removed",
    cart_deleted_selected_desc: "The selected products have been removed from your cart.",
    option_validation_error: "Validation error",
    cart_variants_updated_title: "Variants updated",
    cart_variants_updated_desc: "The product {product} - {variants} has been updated.",
    cart_item_removed_title: "Product removed from cart",
    cart_item_removed_desc:
      "The product {product} - {variants} x {quantity} has been removed from your cart.",
    cart_remove_tooltip: "Remove product from shopping cart",
    cart_add_success_title: "Added to cart successfully",
    cart_add_success_desc:
      "The product {product} - {variants} x {quantity} has been added to your cart.",
    cart_selected_all: "Selected All",
    cart_item_count: "item",
    cart_delete_items: "Delete",
    cart_voucher_label: "Voucher:",
    cart_voucher_desc: "Voucher discount up to 40k VND",
    cart_shipping_label: "Shipping:",
    cart_shipping_desc: "Up to 500,000 VND shipping discount with no minimum order",
    sidebar_main_navigation: "Main navigation",
    sidebar_back_home: "Back to home",
    sidebar_toggle: "Toggle sidebar",
    sidebar_menu: "Menu",
    sidebar_shop_live: "Shop Live",
    sidebar_flash_sale: "Flash Sale",
    sidebar_categories: "Categories",
    sidebar_product_type_1: "Product Type 1",
    sidebar_product_type_2: "Product Type 2",
    sidebar_saved_stores: "Saved stores",
    sidebar_shops: "Shops",
    sidebar_shop_1: "Shop 1",
    sidebar_shop_2: "Shop 2",
    sidebar_profile_info: "Profile Info",
    sidebar_privacy_settings: "Privacy Settings",
    sidebar_notifications: "Notifications",
    sidebar_orders: "Orders",
    sidebar_order_update: "Order Update",
    sidebar_promotions: "Promotions",
    sidebar_wallet_update: "Wallet Update",
    sidebar_marketplace_update: "Market Place Update",
    flash_sale_badge: "Flash sale picks",
    flash_sale_title: "Flash Sale",
    flash_sale_desc: "Fast-moving deals, limited-time picks, and products worth grabbing before they are gone.",
    flash_sale_highlight_limited: "Limited-time prices updated throughout the day.",
    flash_sale_highlight_fast: "Fast picks surfaced for quick, deal-driven shopping.",
    flash_sale_highlight_daily: "Fresh sale items collected into one dedicated page.",
    flash_sale_label: "Flash sale feed",
    flash_sale_page_desc: "A full-page list of time-sensitive deals gathered from the current hot deal stream.",
    admin_seller_centre: "Seller Centre",
    admin_download: "Download",
  },
  vi: {
    see_more: "Xem thêm",
    language_label: "Ngôn ngữ",
    filters: "Bộ lọc",
    clear_all: "Xóa tất cả",
    show_more: "Xem thêm",
    show_less: "Thu gọn",
    not_supported_filter_type: "Loại bộ lọc này chưa được hỗ trợ",
    popular_products: "Sản phẩm phổ biến",
    popular_products_desc: "Những sản phẩm bán chạy và được quan tâm nhiều nhất.",
    bundle_deals: "Combo ưu đãi",
    bundle_deals_desc: "Mua theo combo để tiết kiệm hơn.",
    hot_deals: "Ưu đãi nổi bật",
    hot_deals_desc: "Những deal nóng đáng mua ngay lúc này.",
    recommended_for_you: "Dành cho bạn",
    recommended_for_you_desc: "Các gợi ý phù hợp để bạn xem nhanh và dễ chọn hơn.",
    from_the_same_shop: "Cùng cửa hàng",
    from_the_same_shop_desc: "Xem thêm sản phẩm khác từ shop này.",
    top_picks_from_shop: "Lựa chọn nổi bật từ shop",
    top_picks_from_shop_desc: "Những sản phẩm nổi bật của shop.",
    search_products: "Tìm kiếm sản phẩm",
    search_products_desc: "Xem các sản phẩm phù hợp với nhu cầu tìm kiếm của bạn.",
    daily_discover: "Khám phá mỗi ngày",
    daily_discover_desc: "Gợi ý mới, deal hot và sản phẩm đáng xem mỗi ngày.",
    popular_categories: "Danh mục phổ biến",
    popular_categories_desc: "Những danh mục được xem nhiều nhất trên sàn.",
    featured_brands: "Thương hiệu nổi bật",
    featured_brands_desc: "Những thương hiệu nổi bật đáng khám phá.",
    shop_by_brand: "Mua sắm theo thương hiệu",
    shop_by_brand_desc: "Khám phá sản phẩm từ những thương hiệu được quan tâm nhiều trên sàn.",
    verify_email_otp: "Xác thực OTP email",
    verify_email_otp_desc: "Nhập mã OTP đã gửi đến email để hoàn tất thiết lập tài khoản.",
    sign_in: "Đăng nhập",
    sign_up: "Đăng ký",
    change_password: "Đổi mật khẩu",
    update_profile_user: "Cập nhật hồ sơ",
    fresh_picks_daily: "Gợi ý mới mỗi ngày",
    discover_products_worth_opening: "Khám phá sản phẩm đáng xem",
    discover_products_worth_opening_desc:
      "Nguồn sản phẩm lớn để lướt nhanh, xem deal và khám phá món mới.",
    items_found: "sản phẩm",
    marketplace_feed: "Bảng tin mua sắm",
    popular_tab: "Sản phẩm phổ biến",
    bundle_deals_tab: "Combo ưu đãi",
    recommended_tab: "Dành cho bạn",
    trending_deals_tab: "Deal xu hướng",
    fast_delivery_tab: "Giao nhanh",
    top_rated_tab: "Đánh giá cao",
    best_value_tab: "Giá tốt",
    fresh_arrivals_tab: "Hàng mới",
    daily_discover_popular_desc:
      "Những sản phẩm phổ biến toàn sàn được gom vào cùng một luồng khám phá.",
    daily_discover_bundle_deals_desc:
      "Các combo giá tốt được ưu tiên hiển thị trong luồng khám phá.",
    daily_discover_recommended_desc:
      "Các gợi ý cân bằng dựa trên luồng khám phá mặc định của sàn.",
    daily_discover_trending_desc:
      "Sản phẩm được ưu tiên theo độ phổ biến khi nguồn dữ liệu hỗ trợ.",
    daily_discover_fast_delivery_desc:
      "Các lựa chọn mua nhanh được đẩy lên trước trong trang khám phá hiện tại.",
    daily_discover_top_rated_desc:
      "Sản phẩm có điểm đánh giá hiển thị tốt nhất trên trang hiện tại.",
    daily_discover_best_value_desc:
      "Các sản phẩm giá thấp hơn được ưu tiên cho nhu cầu săn giá tốt.",
    daily_discover_fresh_arrivals_desc:
      "Những sản phẩm mới nhất trong luồng khám phá hiện tại.",
    daily_discover_trust_fast_dispatch: "Giao nhanh",
    daily_discover_trust_fast_dispatch_desc:
      "Các lựa chọn sẵn sàng giao được ưu tiên cho nhu cầu mua hằng ngày.",
    daily_discover_trust_trusted_sellers: "Shop uy tín",
    daily_discover_trust_trusted_sellers_desc:
      "Sản phẩm được chọn lọc từ các shop có tín hiệu phục vụ đáng tin cậy.",
    daily_discover_trust_hot_pricing: "Giá nổi bật",
    daily_discover_trust_hot_pricing_desc:
      "Các sản phẩm phổ biến với mức giá cạnh tranh trên sàn.",
    all_categories: "Tất cả danh mục",
    all_categories_desc: "Khám phá toàn bộ danh mục hiện có trên sàn.",
    category_subcategories_count: "danh mục con",
    browse_this_category: "Khám phá danh mục này",
    brands: "Thương hiệu",
    categories: "Danh mục",
    conditions: "Tình trạng",
    promotions: "Khuyến mãi",
    services: "Dịch vụ",
    ratings: "Đánh giá",
    used: "Đã qua sử dụng",
    new_with_tag: "Mới còn tag",
    on_sale: "Đang giảm giá",
    clearance_sale: "Xả hàng",
    ready_stock: "Có sẵn hàng",
    whole_sale: "Giá sỉ",
    anything_cheap: "Giá rẻ",
    free_shipping: "Miễn phí vận chuyển",
    cod_available: "Thanh toán khi nhận hàng",
    return_7_days: "Đổi trả 7 ngày",
    warranty_included: "Có bảo hành",
    star_1: "1 sao",
    star_2: "2 sao",
    star_3: "3 sao",
    star_4: "4 sao",
    star_5: "5 sao",
    sort_newest: "Mới nhất",
    sort_popularity: "Phổ biến",
    sort_price_low_to_high: "Giá: Thấp đến cao",
    sort_price_high_to_low: "Giá: Cao đến thấp",
    price_min: "Từ",
    price_max: "Đến",
    cart_select_all_products: "Chọn tất cả sản phẩm",
    cart_column_image: "Hình ảnh",
    cart_column_name: "Tên sản phẩm",
    cart_column_variants: "Phân loại",
    cart_column_unit: "Đơn giá",
    cart_column_quantity: "Số lượng",
    cart_column_total: "Thành tiền",
    cart_column_features: "Thao tác",
    cart_voucher_code: "Mã giảm giá",
    cart_view_more: "Xem thêm",
    cart_delete_all: "Xóa tất cả",
    cart_checkout: "Thanh toán",
    cart_total: "Tổng cộng",
    checkout_estimated_shipping: "Phí vận chuyển dự kiến",
    cart_title: "Giỏ hàng",
    footer_help_center: "Trung tâm hỗ trợ",
    footer_how_to_order: "Hướng dẫn đặt hàng",
    footer_payment_methods: "Phương thức thanh toán",
    footer_shipping_delivery: "Giao hàng & vận chuyển",
    footer_return_policy: "Chính sách đổi trả",
    footer_terms_of_service: "Điều khoản dịch vụ",
    footer_privacy_policy: "Chính sách bảo mật",
    footer_dispute_resolution: "Giải quyết tranh chấp",
    footer_inspection_policy: "Chính sách kiểm hàng",
    footer_faq: "Câu hỏi thường gặp",
    footer_seller_center: "Kênh người bán",
    footer_start_selling: "Bắt đầu bán hàng",
    footer_listing_guidelines: "Quy định đăng bán",
    footer_service_fees: "Phí dịch vụ & hoa hồng",
    footer_badge_nationwide_delivery: "Giao hàng toàn quốc",
    footer_badge_secure_payments: "Thanh toán an toàn",
    footer_badge_easy_returns: "Đổi trả dễ dàng",
    footer_badge_customer_support: "Hỗ trợ khách hàng 24/7",
    footer_brand_name: "Market Place",
    brand_logo_alt: "Logo Market Place",
    footer_brand_desc:
      "Nền tảng mua sắm đa ngành hàng với sản phẩm chính hãng, giao hàng nhanh và hỗ trợ sau mua rõ ràng cho cả người mua lẫn người bán.",
    footer_support_hours: "Hỗ trợ hằng ngày từ 08:00 đến 22:00",
    footer_customer_care: "Chăm sóc khách hàng",
    footer_policies: "Chính sách",
    footer_for_sellers: "Dành cho người bán",
    footer_payments: "Thanh toán",
    footer_shipping: "Vận chuyển",
    footer_all_rights_reserved: "Bảo lưu mọi quyền.",
    footer_trusted_marketplace: "Sàn thương mại điện tử đáng tin cậy",
    footer_protected_transactions: "Giao dịch được bảo vệ",
    footer_support_businesses: "Hỗ trợ người bán và doanh nghiệp",
    checkout_payment_method: "Phương thức thanh toán",
    checkout_payment_method_desc: "Chọn cách bạn muốn hoàn tất đơn hàng này.",
    checkout_selected: "Đã chọn",
    checkout_choose: "Chọn",
    checkout_your_items: "Sản phẩm của bạn",
    checkout_your_items_desc: "Kiểm tra lại các sản phẩm trong đơn trước khi đặt hàng.",
    checkout_edit_cart: "Chỉnh sửa giỏ hàng",
    checkout_shop: "Shop",
    checkout_qty: "SL",
    checkout_no_items: "Không có sản phẩm nào được chọn để thanh toán.",
    checkout_order_summary: "Tóm tắt đơn hàng",
    checkout_items: "Sản phẩm",
    checkout_estimated_tax: "Thuế ước tính",
    checkout_placing_order: "Đang đặt hàng...",
    checkout_terms_notice:
      "Khi đặt hàng, bạn đồng ý với điều khoản cửa hàng, chính sách vận chuyển và chính sách đổi trả.",
    checkout_sign_in_continue: "Đăng nhập để tiếp tục",
    checkout_sign_in_continue_desc: "Bạn cần đăng nhập trước khi tiếp tục thanh toán.",
    checkout_go_to_sign_in: "Đi đến đăng nhập",
    checkout_place_order: "Đặt hàng",
    checkout_sign_in_before_payment_error: "Vui lòng đăng nhập trước khi tiếp tục thanh toán.",
    checkout_empty_error: "Chưa có sản phẩm nào để thanh toán. Hãy thêm sản phẩm từ giỏ hàng trước.",
    checkout_order_placed_success: "Đặt hàng thành công với",
    checkout_payment_cod: "Thanh toán khi nhận hàng",
    checkout_payment_cod_desc: "Thanh toán khi đơn hàng được giao đến địa chỉ của bạn.",
    checkout_payment_bank_transfer: "Chuyển khoản ngân hàng",
    checkout_payment_bank_transfer_desc: "Chuyển khoản sau khi hoàn tất đặt hàng.",
    checkout_payment_stripe: "Stripe",
    checkout_payment_stripe_desc: "Thanh toán an toàn bằng thẻ ghi nợ hoặc thẻ tín dụng.",
    checkout_shipping_details: "Thông tin giao hàng",
    checkout_shipping_details_desc: "Xác nhận nơi giao hàng và cách chúng tôi liên hệ với bạn.",
    checkout_full_name: "Họ và tên",
    checkout_recipient_name_placeholder: "Nhập tên người nhận",
    checkout_email: "Email",
    checkout_email_placeholder: "Nhập địa chỉ email của bạn",
    checkout_phone: "Số điện thoại",
    checkout_phone_placeholder: "Nhập số điện thoại của bạn",
    checkout_city: "Thành phố",
    checkout_city_placeholder: "Nhập thành phố của bạn",
    checkout_postal_code: "Mã bưu chính",
    checkout_postal_code_placeholder: "Nhập mã bưu chính",
    checkout_country: "Quốc gia",
    checkout_country_placeholder: "Nhập quốc gia của bạn",
    checkout_address: "Địa chỉ",
    checkout_address_placeholder: "Số nhà, đường, phường/xã, quận/huyện",
    checkout_order_note: "Ghi chú đơn hàng",
    checkout_order_note_placeholder: "Để lại ghi chú cho người bán hoặc đơn vị giao hàng",
    search_scope_marketplace: "Trong sàn",
    search_scope_shop: "Trong shop này",
    search_placeholder: "Tìm kiếm...",
    search_scope_placeholder: "Tất cả",
    validation_choose_valid_search_scope: "Vui lòng chọn phạm vi tìm kiếm hợp lệ",
    validation_enter_at_least_2_characters: "Vui lòng nhập ít nhất 2 ký tự",
    validation_enter_no_more_than_100_characters: "Vui lòng không nhập quá 100 ký tự",
    form_phone: "Số điện thoại",
    form_password: "Mật khẩu",
    form_remember_me: "Ghi nhớ đăng nhập",
    form_signing_in: "Đang đăng nhập...",
    validation_enter_at_least_8_characters: "Vui lòng nhập ít nhất 8 ký tự",
    validation_enter_no_more_than_50_characters: "Vui lòng không nhập quá 50 ký tự",
    validation_password_no_spaces: "Mật khẩu không được chứa khoảng trắng",
    validation_phone_required: "Số điện thoại là bắt buộc",
    validation_enter_at_least_10_characters: "Vui lòng nhập ít nhất 10 ký tự",
    validation_enter_at_least_4_characters: "Vui lòng nhập ít nhất 4 ký tự",
    validation_enter_no_more_than_25_characters: "Vui lòng không nhập quá 25 ký tự",
    validation_enter_no_more_than_8_characters: "Vui lòng không nhập quá 8 ký tự",
    validation_invalid_number: "Số điện thoại không hợp lệ",
    sign_in_phone_placeholder: "Vui lòng nhập số điện thoại của bạn",
    sign_in_password_placeholder: "Vui lòng nhập mật khẩu của bạn",
    form_first_name: "Tên",
    form_last_name: "Họ",
    form_email: "Email",
    form_phone_number: "Số điện thoại",
    form_confirm_password: "Xác nhận mật khẩu",
    sign_up_first_name_placeholder: "Nhập tên của bạn",
    sign_up_last_name_placeholder: "Nhập họ của bạn",
    sign_up_email_placeholder: "Nhập địa chỉ email của bạn",
    sign_up_phone_placeholder: "Nhập số điện thoại của bạn",
    sign_up_password_placeholder: "Tạo mật khẩu",
    sign_up_confirm_password_placeholder: "Xác nhận mật khẩu của bạn",
    form_creating_account: "Đang tạo tài khoản...",
    form_create_account: "Tạo tài khoản",
    validation_first_name_invalid_characters: "Tên chứa ký tự không hợp lệ",
    validation_last_name_invalid_characters: "Họ chứa ký tự không hợp lệ",
    validation_valid_email: "Vui lòng nhập địa chỉ email hợp lệ",
    validation_password_uppercase: "Mật khẩu phải có ít nhất 1 chữ in hoa",
    validation_password_lowercase: "Mật khẩu phải có ít nhất 1 chữ thường",
    validation_password_number: "Mật khẩu phải có ít nhất 1 chữ số",
    validation_confirm_password_required: "Vui lòng xác nhận mật khẩu",
    validation_passwords_do_not_match: "Mật khẩu không khớp",
    validation_password_not_same_as_phone: "Mật khẩu không được trùng với số điện thoại",
    form_new_password: "Mật khẩu mới",
    form_confirm_new_password: "Xác nhận mật khẩu mới",
    change_password_current_placeholder: "Vui lòng nhập mật khẩu",
    change_password_new_placeholder: "Vui lòng nhập mật khẩu mới",
    change_password_confirm_placeholder: "Vui lòng xác nhận mật khẩu mới",
    form_save: "Lưu",
    validation_new_password_confirmation_required: "Bắt buộc xác nhận mật khẩu mới",
    validation_new_password_must_match: "Mật khẩu mới phải khớp",
    validation_new_password_different: "Mật khẩu mới phải khác mật khẩu hiện tại",
    form_otp_code: "Mã OTP",
    check_otp_email_placeholder: "Nhập địa chỉ email của bạn",
    check_otp_code_placeholder: "Nhập mã đã gửi tới email của bạn",
    form_verifying: "Đang xác thực...",
    form_verify_email: "Xác thực email",
    validation_otp_numbers_only: "OTP chỉ được chứa chữ số",
    form_full_name: "Họ và tên",
    form_user_name: "Tên người dùng",
    form_gender: "Chọn giới tính",
    form_choose_gender: "Vui lòng chọn giới tính",
    form_address: "Địa chỉ",
    update_profile_full_name_placeholder: "Vui lòng nhập họ và tên",
    update_profile_user_name_placeholder: "Vui lòng nhập tên người dùng",
    update_profile_phone_placeholder: "Vui lòng nhập số điện thoại của bạn",
    update_profile_gender_placeholder: "Vui lòng chọn giới tính",
    update_profile_email_placeholder: "Vui lòng nhập email của bạn",
    update_profile_address_placeholder: "Vui lòng nhập địa chỉ của bạn",
    gender_male: "nam",
    gender_female: "nữ",
    validation_enter_at_least_3_characters: "Vui lòng nhập ít nhất 3 ký tự",
    validation_enter_no_more_than_250_characters: "Vui lòng không nhập quá 250 ký tự",
    validation_username_invalid_characters: "Tên người dùng chứa ký tự không hợp lệ",
    validation_email_required: "Email là bắt buộc",
    validation_invalid_email: "Email không hợp lệ",
    validation_choose_valid_gender: "Vui lòng chọn giới tính hợp lệ",
    validation_enter_at_least_5_characters: "Vui lòng nhập ít nhất 5 ký tự",
    header_my_account: "Tài khoản của tôi",
    header_my_purchase: "Đơn mua của tôi",
    header_sign_out: "Đăng xuất",
    theme_toggle_sr_only: "Chuyển giao diện",
    theme_light: "Sáng",
    theme_dark: "Tối",
    theme_system: "Hệ thống",
    common_something_went_wrong: "Đã xảy ra lỗi.",
    common_no_data_found: "Không có dữ liệu.",
    common_no_results: "Không có kết quả.",
    product_specifications: "Thông số sản phẩm",
    product_no_specifications: "Chưa có thông số sản phẩm",
    product_description_title: "Mô tả sản phẩm",
    product_no_description: "Chưa có mô tả sản phẩm",
    product_share: "Chia sẻ",
    product_wishlist: "Yêu thích",
    product_add_to_cart: "Thêm vào giỏ hàng",
    product_buy_now: "Mua ngay",
    product_quantity: "Số lượng",
    product_in_stock: "Còn hàng",
    product_pieces_available: "sản phẩm có sẵn",
    product_breadcrumb_home: "Trang chủ",
    product_spec_name: "Tên sản phẩm:",
    product_spec_categories: "Danh mục:",
    product_spec_shop_name: "Tên shop:",
    product_spec_brand: "Thương hiệu:",
    shop_rating: "Đánh giá",
    shop_products: "Sản phẩm",
    shop_followers: "Người theo dõi",
    shop_joined: "Tham gia",
    shop_response_rate: "Tỷ lệ phản hồi",
    shop_response_time: "Thời gian phản hồi",
    shop_following: "Đang theo dõi",
    shop_follow: "Theo dõi",
    shop_view: "Xem shop",
    shop_name_fallback: "Tên shop",
    not_found_title: "Không tìm thấy trang",
    not_found_description:
      "Trang bạn đang tìm có thể đã được di chuyển, bị xóa hoặc chưa từng tồn tại.",
    not_found_back_home: "Về trang chủ",
    not_found_browse_categories: "Xem danh mục",
    toast_close: "Đóng",
    auth_sign_in_success: "Đăng nhập thành công.",
    auth_sign_in_failed: "Đăng nhập thất bại. Vui lòng thử lại.",
    auth_sign_up_success: "Tài khoản của bạn đã được tạo thành công.",
    auth_sign_up_failed: "Đăng ký thất bại. Vui lòng thử lại.",
    auth_check_otp_success: "Email của bạn đã được xác thực thành công.",
    auth_check_otp_failed: "Xác thực OTP thất bại. Vui lòng thử lại.",
    quantity_reached_maximum: "Đã đạt số lượng tối đa!",
    quantity_limit_warning:
      "Nếu tăng thêm số lượng, bạn có thể vượt giới hạn mua và giá có thể thay đổi",
    review_validation_missing: "Vui lòng chọn số sao và nhập nhận xét.",
    review_submit: "Gửi đánh giá",
    review_placeholder: "Nhập nhận xét của bạn tại đây...",
    review_average_rating: "Đánh giá trung bình",
    review_distribution: "Phân bố đánh giá",
    review_total_reviews: "đánh giá",
    cart_quantity_updated_title: "Đã cập nhật số lượng",
    cart_quantity_updated_desc: "Sản phẩm {product} x {quantity} đã được cập nhật trong giỏ hàng.",
    cart_load_failed: "Không thể tải giỏ hàng",
    api_server_error: "Có lỗi hệ thống, vui lòng thử lại sau.",
    api_invalid_request: "Yêu cầu không hợp lệ.",
    cart_deleted_selected_title: "Đã xóa sản phẩm đã chọn",
    cart_deleted_selected_desc: "Các sản phẩm đã chọn đã được xóa khỏi giỏ hàng.",
    option_validation_error: "Lỗi xác thực",
    cart_variants_updated_title: "Đã cập nhật phân loại",
    cart_variants_updated_desc: "Sản phẩm {product} - {variants} đã được cập nhật.",
    cart_item_removed_title: "Đã xóa sản phẩm khỏi giỏ hàng",
    cart_item_removed_desc:
      "Sản phẩm {product} - {variants} x {quantity} đã được xóa khỏi giỏ hàng.",
    cart_remove_tooltip: "Xóa sản phẩm khỏi giỏ hàng",
    cart_add_success_title: "Đã thêm vào giỏ hàng thành công",
    cart_add_success_desc:
      "Sản phẩm {product} - {variants} x {quantity} đã được thêm vào giỏ hàng.",
    cart_selected_all: "Đã chọn tất cả",
    cart_item_count: "sản phẩm",
    cart_delete_items: "Xóa",
    cart_voucher_label: "Voucher:",
    cart_voucher_desc: "Voucher giảm đến 40k₫",
    cart_shipping_label: "Vận chuyển:",
    cart_shipping_desc: "Giảm 500.000₫ phí vận chuyển đơn tối thiểu 0₫",
    sidebar_main_navigation: "Điều hướng chính",
    sidebar_back_home: "Về trang chủ",
    sidebar_toggle: "Bật/tắt thanh bên",
    sidebar_menu: "Menu",
    sidebar_shop_live: "Mua sắm trực tiếp",
    sidebar_flash_sale: "Flash Sale",
    sidebar_categories: "Danh mục",
    sidebar_product_type_1: "Loại sản phẩm 1",
    sidebar_product_type_2: "Loại sản phẩm 2",
    sidebar_saved_stores: "Shop đã lưu",
    sidebar_shops: "Shop",
    sidebar_shop_1: "Shop 1",
    sidebar_shop_2: "Shop 2",
    sidebar_profile_info: "Thông tin hồ sơ",
    sidebar_privacy_settings: "Cài đặt riêng tư",
    sidebar_notifications: "Thông báo",
    sidebar_orders: "Đơn hàng",
    sidebar_order_update: "Cập nhật đơn hàng",
    sidebar_promotions: "Khuyến mãi",
    sidebar_wallet_update: "Cập nhật ví",
    sidebar_marketplace_update: "Cập nhật Market Place",
    flash_sale_badge: "Ưu đãi flash sale",
    flash_sale_title: "Flash Sale",
    flash_sale_desc: "Những deal chớp nhoáng, ưu đãi có thời hạn và sản phẩm đáng mua trước khi hết cơ hội.",
    flash_sale_highlight_limited: "Giá giới hạn được cập nhật liên tục trong ngày.",
    flash_sale_highlight_fast: "Các deal nổi bật được đưa lên trước để mua nhanh hơn.",
    flash_sale_highlight_daily: "Sản phẩm giảm giá mới được gom vào một trang riêng.",
    flash_sale_label: "Luồng flash sale",
    flash_sale_page_desc: "Trang tổng hợp đầy đủ các sản phẩm ưu đãi theo luồng hot deal hiện tại.",
    admin_seller_centre: "Kênh người bán",
    admin_download: "Tải xuống",
  },
  ja: {
    see_more: "もっと見る",
    language_label: "言語",
    filters: "絞り込み",
    clear_all: "すべてクリア",
    show_more: "もっと見る",
    show_less: "閉じる",
    not_supported_filter_type: "このフィルター形式は未対応です",
    popular_products: "人気商品",
    popular_products_desc: "よく売れていて、よく見られている商品です。",
    bundle_deals: "バンドルセール",
    bundle_deals_desc: "まとめ買いでお得になる商品です。",
    hot_deals: "注目セール",
    hot_deals_desc: "今チェックしたい注目のセール商品です。",
    recommended_for_you: "あなたへのおすすめ",
    recommended_for_you_desc: "次に見たくなる商品をまとめて表示します。",
    from_the_same_shop: "同じショップの商品",
    from_the_same_shop_desc: "このショップの他の商品もまとめて見られます。",
    top_picks_from_shop: "ショップのおすすめ",
    top_picks_from_shop_desc: "このショップの注目商品を集めました。",
    search_products: "商品検索",
    search_products_desc: "探している条件に合う商品を見つけやすく表示します。",
    daily_discover: "毎日の発見",
    daily_discover_desc: "毎日更新される注目商品とお得な商品です。",
    popular_categories: "人気カテゴリ",
    popular_categories_desc: "よく見られているカテゴリをまとめました。",
    featured_brands: "注目ブランド",
    featured_brands_desc: "チェックしておきたい注目ブランドです。",
    shop_by_brand: "ブランドから探す",
    shop_by_brand_desc: "人気ブランドの商品をブランド別に探せます。",
    verify_email_otp: "メールOTP確認",
    verify_email_otp_desc:
      "アカウント設定を完了するためにメールに届いたOTPを入力してください。",
    sign_in: "サインイン",
    sign_up: "サインアップ",
    change_password: "パスワード変更",
    update_profile_user: "プロフィール更新",
    fresh_picks_daily: "毎日の新着ピック",
    discover_products_worth_opening: "見逃せない商品を発見",
    discover_products_worth_opening_desc:
      "気になる商品を次々見つけやすい発見フィードです。",
    items_found: "件の商品",
    marketplace_feed: "マーケットフィード",
    popular_tab: "人気商品",
    bundle_deals_tab: "バンドルセール",
    recommended_tab: "あなたへのおすすめ",
    trending_deals_tab: "トレンドセール",
    fast_delivery_tab: "スピード配送",
    top_rated_tab: "高評価",
    best_value_tab: "お買い得",
    fresh_arrivals_tab: "新着商品",
    daily_discover_popular_desc:
      "マーケット全体で人気の商品を同じ発見フィードにまとめています。",
    daily_discover_bundle_deals_desc:
      "お得な組み合わせ商品を発見フィード内で優先表示します。",
    daily_discover_recommended_desc:
      "デフォルトの発見フィードを基にしたバランスの良いおすすめです。",
    daily_discover_trending_desc:
      "フィードが対応している場合、人気順で商品を表示します。",
    daily_discover_fast_delivery_desc:
      "今の発見ページで素早く買いやすい商品を先に表示します。",
    daily_discover_top_rated_desc:
      "現在のページで評価が高く見える商品を優先表示します。",
    daily_discover_best_value_desc:
      "お得に探したい人向けに、低価格帯の商品を優先表示します。",
    daily_discover_fresh_arrivals_desc: "現在の発見フィード内の新着商品です。",
    daily_discover_trust_fast_dispatch: "スピード発送",
    daily_discover_trust_fast_dispatch_desc:
      "日常の買い物向けに、すぐ発送できる商品を優先しています。",
    daily_discover_trust_trusted_sellers: "信頼できるショップ",
    daily_discover_trust_trusted_sellers_desc:
      "サービス評価の高いショップの商品を厳選しています。",
    daily_discover_trust_hot_pricing: "注目価格",
    daily_discover_trust_hot_pricing_desc:
      "マーケットで競争力のある価格の商品を目立たせています。",
    all_categories: "すべてのカテゴリ",
    all_categories_desc: "マーケットプレイス内のすべてのカテゴリを一覧できます。",
    category_subcategories_count: "サブカテゴリ",
    browse_this_category: "このカテゴリを見る",
    brands: "ブランド",
    categories: "カテゴリ",
    conditions: "商品の状態",
    promotions: "プロモーション",
    services: "サービス",
    ratings: "評価",
    used: "中古",
    new_with_tag: "新品タグ付き",
    on_sale: "セール中",
    clearance_sale: "クリアランス",
    ready_stock: "在庫あり",
    whole_sale: "まとめ買い",
    anything_cheap: "お買い得商品",
    free_shipping: "送料無料",
    cod_available: "代金引換対応",
    return_7_days: "7日間返品",
    warranty_included: "保証付き",
    star_1: "1つ星",
    star_2: "2つ星",
    star_3: "3つ星",
    star_4: "4つ星",
    star_5: "5つ星",
    sort_newest: "新着順",
    sort_popularity: "人気順",
    sort_price_low_to_high: "価格の安い順",
    sort_price_high_to_low: "価格の高い順",
    price_min: "最小",
    price_max: "最大",
    cart_select_all_products: "すべての商品を選択",
    cart_column_image: "画像",
    cart_column_name: "商品名",
    cart_column_variants: "バリエーション",
    cart_column_unit: "単価",
    cart_column_quantity: "数量",
    cart_column_total: "合計",
    cart_column_features: "操作",
    cart_voucher_code: "クーポンコード",
    cart_view_more: "もっと見る",
    cart_delete_all: "すべて削除",
    cart_checkout: "チェックアウト",
    cart_total: "合計",
    checkout_estimated_shipping: "配送料の目安",
    cart_title: "カート",
    footer_help_center: "ヘルプセンター",
    footer_how_to_order: "注文方法",
    footer_payment_methods: "支払い方法",
    footer_shipping_delivery: "配送とお届け",
    footer_return_policy: "返品ポリシー",
    footer_terms_of_service: "利用規約",
    footer_privacy_policy: "プライバシーポリシー",
    footer_dispute_resolution: "紛争解決",
    footer_inspection_policy: "検品ポリシー",
    footer_faq: "よくある質問",
    footer_seller_center: "出店者センター",
    footer_start_selling: "販売を始める",
    footer_listing_guidelines: "出品ガイドライン",
    footer_service_fees: "サービス料と手数料",
    footer_badge_nationwide_delivery: "全国配送",
    footer_badge_secure_payments: "安全な決済",
    footer_badge_easy_returns: "簡単返品",
    footer_badge_customer_support: "24時間年中無休サポート",
    footer_brand_name: "Market Place",
    brand_logo_alt: "Market Place ロゴ",
    footer_brand_desc:
      "正規品、迅速な配送、購入後の明確なサポートを提供する総合マーケットプレイスです。",
    footer_support_hours: "毎日 08:00 から 22:00 までサポート対応",
    footer_customer_care: "カスタマーケア",
    footer_policies: "ポリシー",
    footer_for_sellers: "出店者向け",
    footer_payments: "決済",
    footer_shipping: "配送",
    footer_all_rights_reserved: "All rights reserved.",
    footer_trusted_marketplace: "信頼できるECマーケットプレイス",
    footer_protected_transactions: "保護された取引",
    footer_support_businesses: "出店者と事業者をサポート",
    checkout_payment_method: "支払い方法",
    checkout_payment_method_desc: "この購入を完了する方法を選択してください。",
    checkout_selected: "選択済み",
    checkout_choose: "選ぶ",
    checkout_your_items: "ご注文商品",
    checkout_your_items_desc: "注文確定前に、注文に含まれる商品を確認してください。",
    checkout_edit_cart: "カートを編集",
    checkout_shop: "ショップ",
    checkout_qty: "数量",
    checkout_no_items: "チェックアウト対象の商品が選択されていません。",
    checkout_order_summary: "注文内容",
    checkout_items: "商品",
    checkout_estimated_tax: "概算税額",
    checkout_placing_order: "注文を処理中...",
    checkout_terms_notice:
      "注文を確定すると、ストアの利用規約、配送ポリシー、返品ポリシーに同意したものとみなされます。",
    checkout_sign_in_continue: "サインインして続行",
    checkout_sign_in_continue_desc: "支払いに進む前にログインが必要です。",
    checkout_go_to_sign_in: "サインインへ進む",
    checkout_place_order: "注文する",
    checkout_sign_in_before_payment_error: "支払いを続ける前にサインインしてください。",
    checkout_empty_error: "チェックアウト商品がありません。先にカートへ商品を追加してください。",
    checkout_order_placed_success: "次の方法で注文が完了しました",
    checkout_payment_cod: "代金引換",
    checkout_payment_cod_desc: "商品が配送先に届いたときに支払います。",
    checkout_payment_bank_transfer: "銀行振込",
    checkout_payment_bank_transfer_desc: "注文後に代金を振り込みます。",
    checkout_payment_stripe: "Stripe",
    checkout_payment_stripe_desc: "デビットカードまたはクレジットカードで安全に支払います。",
    checkout_shipping_details: "配送情報",
    checkout_shipping_details_desc: "配送先と連絡先を確認してください。",
    checkout_full_name: "氏名",
    checkout_recipient_name_placeholder: "受取人の名前を入力してください",
    checkout_email: "メールアドレス",
    checkout_email_placeholder: "メールアドレスを入力してください",
    checkout_phone: "電話番号",
    checkout_phone_placeholder: "電話番号を入力してください",
    checkout_city: "市区町村",
    checkout_city_placeholder: "市区町村を入力してください",
    checkout_postal_code: "郵便番号",
    checkout_postal_code_placeholder: "郵便番号を入力してください",
    checkout_country: "国",
    checkout_country_placeholder: "国名を入力してください",
    checkout_address: "住所",
    checkout_address_placeholder: "番地、地区、市区町村",
    checkout_order_note: "注文メモ",
    checkout_order_note_placeholder: "販売者または配達員へのメモを入力してください",
    search_scope_marketplace: "マーケット全体",
    search_scope_shop: "このショップ内",
    search_placeholder: "検索...",
    search_scope_placeholder: "すべて",
    validation_choose_valid_search_scope: "有効な検索範囲を選択してください",
    validation_enter_at_least_2_characters: "2文字以上入力してください",
    validation_enter_no_more_than_100_characters: "100文字以内で入力してください",
    form_phone: "電話番号",
    form_password: "パスワード",
    form_remember_me: "ログイン状態を保持",
    form_signing_in: "サインイン中...",
    validation_enter_at_least_8_characters: "8文字以上入力してください",
    validation_enter_no_more_than_50_characters: "50文字以内で入力してください",
    validation_password_no_spaces: "パスワードにスペースは使用できません",
    validation_phone_required: "電話番号は必須です",
    validation_enter_at_least_10_characters: "10文字以上入力してください",
    validation_enter_at_least_4_characters: "4文字以上入力してください",
    validation_enter_no_more_than_25_characters: "25文字以内で入力してください",
    validation_enter_no_more_than_8_characters: "8文字以内で入力してください",
    validation_invalid_number: "無効な番号です",
    sign_in_phone_placeholder: "電話番号を入力してください",
    sign_in_password_placeholder: "パスワードを入力してください",
    form_first_name: "名",
    form_last_name: "姓",
    form_email: "メールアドレス",
    form_phone_number: "電話番号",
    form_confirm_password: "パスワード確認",
    sign_up_first_name_placeholder: "名を入力してください",
    sign_up_last_name_placeholder: "姓を入力してください",
    sign_up_email_placeholder: "メールアドレスを入力してください",
    sign_up_phone_placeholder: "電話番号を入力してください",
    sign_up_password_placeholder: "パスワードを作成してください",
    sign_up_confirm_password_placeholder: "パスワードを再入力してください",
    form_creating_account: "アカウント作成中...",
    form_create_account: "アカウント作成",
    validation_first_name_invalid_characters: "名に無効な文字が含まれています",
    validation_last_name_invalid_characters: "姓に無効な文字が含まれています",
    validation_valid_email: "有効なメールアドレスを入力してください",
    validation_password_uppercase: "パスワードには大文字を1文字以上含めてください",
    validation_password_lowercase: "パスワードには小文字を1文字以上含めてください",
    validation_password_number: "パスワードには数字を1文字以上含めてください",
    validation_confirm_password_required: "パスワード確認を入力してください",
    validation_passwords_do_not_match: "パスワードが一致しません",
    validation_password_not_same_as_phone: "パスワードは電話番号と同じにできません",
    form_new_password: "新しいパスワード",
    form_confirm_new_password: "新しいパスワード確認",
    change_password_current_placeholder: "パスワードを入力してください",
    change_password_new_placeholder: "新しいパスワードを入力してください",
    change_password_confirm_placeholder: "新しいパスワードを再入力してください",
    form_save: "保存",
    validation_new_password_confirmation_required: "新しいパスワード確認は必須です",
    validation_new_password_must_match: "新しいパスワードが一致している必要があります",
    validation_new_password_different: "新しいパスワードは現在のパスワードと異なる必要があります",
    form_otp_code: "OTPコード",
    check_otp_email_placeholder: "メールアドレスを入力してください",
    check_otp_code_placeholder: "メールに送信されたコードを入力してください",
    form_verifying: "確認中...",
    form_verify_email: "メールを確認",
    validation_otp_numbers_only: "OTPは数字のみ使用できます",
    form_full_name: "氏名",
    form_user_name: "ユーザー名",
    form_gender: "性別を選択",
    form_choose_gender: "性別を選択してください",
    form_address: "住所",
    update_profile_full_name_placeholder: "氏名を入力してください",
    update_profile_user_name_placeholder: "ユーザー名を入力してください",
    update_profile_phone_placeholder: "電話番号を入力してください",
    update_profile_gender_placeholder: "性別を選択してください",
    update_profile_email_placeholder: "メールアドレスを入力してください",
    update_profile_address_placeholder: "住所を入力してください",
    gender_male: "男性",
    gender_female: "女性",
    validation_enter_at_least_3_characters: "3文字以上入力してください",
    validation_enter_no_more_than_250_characters: "250文字以内で入力してください",
    validation_username_invalid_characters: "ユーザー名に無効な文字が含まれています",
    validation_email_required: "メールアドレスは必須です",
    validation_invalid_email: "無効なメールアドレスです",
    validation_choose_valid_gender: "有効な性別を選択してください",
    validation_enter_at_least_5_characters: "5文字以上入力してください",
    header_my_account: "マイアカウント",
    header_my_purchase: "購入履歴",
    header_sign_out: "サインアウト",
    theme_toggle_sr_only: "テーマを切り替える",
    theme_light: "ライト",
    theme_dark: "ダーク",
    theme_system: "システム",
    common_something_went_wrong: "問題が発生しました。",
    common_no_data_found: "データが見つかりません。",
    common_no_results: "結果がありません。",
    product_specifications: "商品の仕様",
    product_no_specifications: "仕様情報はありません",
    product_description_title: "商品説明",
    product_no_description: "商品説明はありません",
    product_share: "シェア",
    product_wishlist: "お気に入り",
    product_add_to_cart: "カートに追加",
    product_buy_now: "今すぐ購入",
    product_quantity: "数量",
    product_in_stock: "在庫あり",
    product_pieces_available: "点在庫あり",
    product_breadcrumb_home: "ホーム",
    product_spec_name: "商品名:",
    product_spec_categories: "カテゴリ:",
    product_spec_shop_name: "ショップ名:",
    product_spec_brand: "ブランド:",
    shop_rating: "評価",
    shop_products: "商品数",
    shop_followers: "フォロワー",
    shop_joined: "開始年",
    shop_response_rate: "返信率",
    shop_response_time: "返信時間",
    shop_following: "フォロー中",
    shop_follow: "フォロー",
    shop_view: "ショップを見る",
    shop_name_fallback: "ショップ名",
    not_found_title: "ページが見つかりません",
    not_found_description:
      "お探しのページは移動されたか、削除されたか、もともと存在しない可能性があります。",
    not_found_back_home: "ホームへ戻る",
    not_found_browse_categories: "カテゴリを見る",
    toast_close: "閉じる",
    auth_sign_in_success: "サインインに成功しました。",
    auth_sign_in_failed: "サインインに失敗しました。もう一度お試しください。",
    auth_sign_up_success: "アカウントが正常に作成されました。",
    auth_sign_up_failed: "サインアップに失敗しました。もう一度お試しください。",
    auth_check_otp_success: "メールの確認が完了しました。",
    auth_check_otp_failed: "OTP確認に失敗しました。もう一度お試しください。",
    quantity_reached_maximum: "最大数量に達しました。",
    quantity_limit_warning:
      "これ以上数量を増やすと購入上限を超え、価格が変動する可能性があります",
    review_validation_missing: "評価とコメントの両方を入力してください。",
    review_submit: "送信",
    review_placeholder: "レビューを入力してください...",
    review_average_rating: "平均評価",
    review_distribution: "評価の内訳",
    review_total_reviews: "件のレビュー",
    cart_quantity_updated_title: "数量を更新しました",
    cart_quantity_updated_desc: "商品 {product} x {quantity} をカート内で更新しました。",
    cart_load_failed: "カートを読み込めません",
    api_server_error: "サーバーエラーが発生しました。しばらくしてからもう一度お試しください。",
    api_invalid_request: "無効なリクエストです。",
    cart_deleted_selected_title: "選択した商品を削除しました",
    cart_deleted_selected_desc: "選択した商品はカートから削除されました。",
    option_validation_error: "入力エラー",
    cart_variants_updated_title: "バリエーションを更新しました",
    cart_variants_updated_desc: "商品 {product} - {variants} を更新しました。",
    cart_item_removed_title: "商品をカートから削除しました",
    cart_item_removed_desc:
      "商品 {product} - {variants} x {quantity} をカートから削除しました。",
    cart_remove_tooltip: "商品をカートから削除",
    cart_add_success_title: "カートに追加しました",
    cart_add_success_desc:
      "商品 {product} - {variants} x {quantity} をカートに追加しました。",
    cart_selected_all: "すべて選択",
    cart_item_count: "商品",
    cart_delete_items: "削除",
    cart_voucher_label: "クーポン:",
    cart_voucher_desc: "最大40,000VNDのクーポン割引",
    cart_shipping_label: "配送:",
    cart_shipping_desc: "最低注文金額なしで最大500,000VNDの配送料割引",
    sidebar_main_navigation: "メインナビゲーション",
    sidebar_back_home: "ホームへ戻る",
    sidebar_toggle: "サイドバーを切り替える",
    sidebar_menu: "メニュー",
    sidebar_shop_live: "ライブショッピング",
    sidebar_flash_sale: "フラッシュセール",
    sidebar_categories: "カテゴリ",
    sidebar_product_type_1: "商品タイプ 1",
    sidebar_product_type_2: "商品タイプ 2",
    sidebar_saved_stores: "保存したショップ",
    sidebar_shops: "ショップ",
    sidebar_shop_1: "ショップ 1",
    sidebar_shop_2: "ショップ 2",
    sidebar_profile_info: "プロフィール情報",
    sidebar_privacy_settings: "プライバシー設定",
    sidebar_notifications: "通知",
    sidebar_orders: "注文",
    sidebar_order_update: "注文更新",
    sidebar_promotions: "プロモーション",
    sidebar_wallet_update: "ウォレット更新",
    sidebar_marketplace_update: "Market Place 更新",
    flash_sale_badge: "フラッシュセール特集",
    flash_sale_title: "フラッシュセール",
    flash_sale_desc: "短時間で動くお得な商品や、売り切れる前にチェックしたい期間限定セールをまとめています。",
    flash_sale_highlight_limited: "期間限定価格を日中に随時更新します。",
    flash_sale_highlight_fast: "すばやく買いやすい注目セールを先に表示します。",
    flash_sale_highlight_daily: "新しいセール商品を専用ページにまとめています。",
    flash_sale_label: "フラッシュセール一覧",
    flash_sale_page_desc: "現在の hot deal ストリームから、期間限定のお得商品をまとめた一覧ページです。",
    admin_seller_centre: "販売者センター",
    admin_download: "ダウンロード",
  },
};
