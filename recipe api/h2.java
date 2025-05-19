public class h2 {
     int r;
     int t;
     
     public void myfunc(){
        int w=r*t;
        System.err.println(w);
     }

    public static void main(String[] args) {
        h2 h=new h2();
        h.r=5;
        h.t=4;
        h.myfunc();

    }
}
