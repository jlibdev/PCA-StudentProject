INSTALLATION INSTRUCTIONS :



ADD THE DEPENDENCIES :
- Node.js
- Composer
- XAMPP or Laragon (Optional)


FRONT END
- npm install
- npm install @tanstack/react-table
- npm install @radix-ui/react-avatar
- npm install --save-dev tailwind-scrollbar
- npm install @radix-ui/react-switch


BACK END
- composer install / composer install --ignore-platform-reqs
- cp .env.example .env
- php artisan key:generate
- php artisan migrate



FOR EXCEL IMPORT/EXPORT
NOTE: uncomment out extension=gd in your php.ini file for this to work
- composer require maatwebsite/excel --with-all-dependencies
  

NOTE:

FOR Members that were added before 23/10/2024 . Run git remote set-url origin https://github.com/jlibdev/PCA-StudentProject.git before starting.
Repo has been renamed
CHARLS


FRONTEND COMPONENTS NOTES:
================================================================


<DatePicker></DatePicker>
================================================================
Specific Date Picker
Props : date , setDate => Type React.useState<Date>()

Sample Use:

const {enddate,  setEndDate} = React.useState<Date>()
<DatePicker date={enddate} setDate={setEndDate} />
===============================================================


