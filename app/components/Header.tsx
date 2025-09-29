'use client';

export default function Header() {
  return (
        <div className="w-full h-[204px] bg-primary border-4 border-primary relative">
          <div className="absolute inset-0 flex flex-col items-center justify-center px-[10px] py-[59px] gap-6" style={{ paddingTop: '59px', paddingBottom: '32px' }}>
        {/* Main Title */}
        <div className="w-[355px] h-[113px] flex flex-col items-center gap-3" style={{ gap: '12px' }}>
          <h1 className="font-palmer-lake text-[73.99px] leading-[39px] text-center text-white w-[217px] h-[78px]">
            AAJ KYA KHAANA HAI?
          </h1>
          
          {/* Tagline */}
          <div className="flex justify-center items-center gap-[10px] w-[302px] h-[23px] bg-primary-dark rounded-[31px]" style={{ padding: '4px 12px 6px' }}>
            <span className="font-ibm-plex-mono text-[12px] leading-[15px] text-center tracking-[-0.05em] text-text-light w-[278px] h-[15px]">
              From 'kuch bhi bana lo' to 'ye banate hai'
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}