const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root=null;
		this.parentNodes=[];
		this.nodes=[];
	}

	push(data, priority) {
		var n=new Node(data, priority);
		this.insertNode(n);	
		this.shiftNodeUp(n);
	}

	pop() {
		if(this.root!=null){
		 var x=this.root.data;
		 var detached=new Node(null,null);		 
         detached=this.detachRoot();		 
		 if(this.parentNodes.length>0) {	 
			 this.restoreRootFromLastInsertedNode(detached);
		     this.shiftNodeDown(this.root);
		     }
		 return x;						
		}
	}

	detachRoot() {
		var x=new Node(null,null);
		x=this.root;
		if (this.parentNodes.indexOf(this.root)>=0) this.parentNodes.splice(this.parentNodes.indexOf(this.root),1);
		this.nodes.splice(this.nodes.indexOf(x),1);
		//if (this.root.left!=null) this.root.left.parent=null;
		//if (this.root.right!=null) this.root.right.parent=null;				
		if (this.parentNodes.indexOf(this.root)>=0) this.parentNodes.splice(this.parentNodes.indexOf(this.root),1);
		
		this.root=null;
		return x
	}

	restoreRootFromLastInsertedNode(detached) {
		var flag=1;
		this.root=this.parentNodes.pop();    
		if (detached.left!=null) {
			this.root.left=detached.left;
			this.root.left.parent=this.root;
			flag=1;
		}
		if (detached.right!=null) {
			this.root.right=detached.right;
			this.root.right.parent=this.root;
            flag=0;			
		}
		if (this.root.parent!=null) {
			if(this.root.parent.right==this.root) {
			this.parentNodes.unshift(this.root.parent);
			}
			this.root.parent.removeChild(this.root);
			}
		if (flag==1)this.parentNodes.unshift(this.root);
		
	}

	size() {
		return this.nodes.length;
	}

	isEmpty() {
		if (this.parentNodes.length==0) return true;
		else return false;
	}

	clear() {
		this.root=null;
		this.parentNodes=[];
		this.nodes=[];
	}

	insertNode(node) {
		if (this.isEmpty()) {
		 this.root=node;
         this.nodes.push(node);
		 this.parentNodes.push(node);
		}		
		 else {	
          this.nodes.push(node);
		  this.parentNodes.push(node);		 
		  this.parentNodes[0].appendChild(node);
		  if (this.parentNodes[0].right!=null) this.parentNodes.shift();
	    }	 
	}

	shiftNodeUp(node) {
		
		if (node.parent==null) this.root=node;
		else {
           if (node.priority>node.parent.priority) {			   
		     if (node.parent.right!=null) {
				 if(this.parentNodes.indexOf(node)>=0)
					 this.parentNodes.splice(this.parentNodes.indexOf(node),1,node.parent);
			    }
		     else { 
			     var b;
				 b=this.parentNodes.indexOf(node.parent);
				 if (this.parentNodes.indexOf(node)>=0)this.parentNodes[this.parentNodes.indexOf(node)]=node.parent;
				 if (b>=0)this.parentNodes[b]=node;
			    }
		     node.swapWithParent();			 
		     this.shiftNodeUp(node);
		    } 	 						 		 		 
		}
		
	}

	shiftNodeDown(node) {
		
		var max=new Node(null,null);
		max=node;		
		if (node.left!=null && node.priority<node.left.priority) max=node.left; 
        if (node.right!=null && max.priority<node.right.priority) max=node.right;		
		if (max.priority>node.priority) {			           			
            if (this.root==node) this.root=max;	
			max.swapWithParent();
			if(node.right==null) this.parentNodes.splice(this.parentNodes.indexOf(max),1,node);
		    if(max.right==null) this.parentNodes.splice(this.parentNodes.indexOf(node),1,node.parent);
		    this.shiftNodeDown(node);
		}
		
	}
}

module.exports = MaxHeap;
