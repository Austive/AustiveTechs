const fs = require('fs');
let code = fs.readFileSync('app/page.tsx', 'utf8');

code = code.replace(
  'p-4 rounded-xl text-center font-semibold ${',
  'p-3 rounded-lg text-xs text-center font-bold uppercase tracking-widest mt-4 border ${'
);

code = code.replace(
  '? "bg-emerald-50 text-emerald-700 border-2 border-emerald-200"',
  '? "bg-emerald-50 text-emerald-700 border-emerald-200"'
);

code = code.replace(
  ': "bg-red-50 text-red-700 border-2 border-red-200"',
  ': "bg-red-50 text-red-700 border-red-200"'
);

code = code.replace(
  '</form>\n            </div>\n          </div>\n        </div>\n      </section>\n\n      {/* Compact Footer */}',
  `</form>\n            </div>\n          </div>\n        </div>\n\n        {/* Background Decorations */}\n        <div className="absolute top-0 right-0 w-64 h-64 bg-sky-blue opacity-10 rounded-full blur-3xl -mr-32 -mt-32 hidden md:block"></div>\n        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gold opacity-5 rounded-full blur-3xl -ml-40 -mb-40 hidden md:block"></div>\n      </section>\n\n      {/* Compact Footer */}`
);

fs.writeFileSync('app/page.tsx', code);
console.log('Replaced');
